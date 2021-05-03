import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import ProgressBar from '../../ui-utils/ProgressBar';
import { ThemeProvider, Button } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import { UPLOAD_FILES_OF_PRODUCT } from '../../requests/mutations';
import theme from '../../ui-utils/muiTheme';
import { PRODUCTS } from '../../requests/queries';

const UploadFiles = ({ setNotice, setProducts }) => {
  const history = useHistory();
  const [upload, { loading }] = useMutation(UPLOAD_FILES_OF_PRODUCT, {
    onCompleted: (data) => {
      setProducts(data.uploadFilesOfProduct);
      console.log('pdtupload', data.uploadFilesOfProduct);

      setNotice({
        message:
          'Files uploaded successfully, you can now edit and post products!',
        severity: 'success'
      });
      history.push('/admin/unpublished-items');
      window.location.reload(false);
     
    },
    onError: (error) => {
      setNotice({
        message: error?.graphQLErrors[0]?.message,
        severity: 'error'
      });
      console.log('erro', error.message);
    },
    refetchQueries: [{ query: PRODUCTS }]
  });

  const handleFilesUpload = ({ target: { validity, files } }) => {
    if (validity.valid) upload({ variables: { files } });
  };

  //if(data) return null;
  if (loading) return <ProgressBar />;
  return (
    <ThemeProvider theme={theme}>
      <Button color="secondary" component="label">
        <input
          type="file"
          multiple
          required
          hidden
          onChange={handleFilesUpload}
          accept="image/*"
        />
        <PublishIcon /> Upload photos
      </Button>
    </ThemeProvider>
  );
};

export default UploadFiles;
