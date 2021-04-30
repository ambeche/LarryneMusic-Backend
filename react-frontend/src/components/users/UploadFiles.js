import { useMutation } from '@apollo/client';
import ProgressBar from '../../ui-utils/ProgressBar';
import { UPLOAD_FILES_OF_PRODUCT } from '../../requests/mutations';

const UploadFiles = ({ setNotice, setProducts }) => {
  const [upload, { data, loading }] = useMutation(UPLOAD_FILES_OF_PRODUCT, {
    onCompleted: (data) => {
      setProducts(data.uploadFilesOfProduct);
      setNotice({
        message:
          'Files uploaded successfully, you can now edit and post products!',
        severity: 'success'
      });
    },
    onError: (error) => {
      setNotice({
        message: error.graphQLErrors[0].message,
        severity: 'error'
      });
      console.log('erro', error.message);
    }
  });

  const handleFilesUpload = ({ target: { validity, files } }) => {
    if (validity.valid) upload({ variables: { files } });
  };

  //if(data) return null;
  if (loading) return <ProgressBar />;
  return <input type="file" multiple required onChange={handleFilesUpload} />;
};

export default UploadFiles;
