import { useMutation } from '@apollo/client';

const UploadFiles = () => {
  const [upload] = useMutation();

  const handleFilesUpload = ({ target: { validity, files } }) => {
    if (validity.valid) upload({ variables: { files } });
  };
  return <input type="file" multiple required onChange={handleFilesUpload} />;
};
