import { React, useState } from 'react';
import UploadFiles from './UploadFiles';

const AdminPanel = ({ user, setNotice }) => {
  const [products, setProducts] = useState(null);

  if (user && user?.role === user?.roleValue) {
    return (
      <div>
        <UploadFiles setNotice={setNotice} setProducts={setProducts} />
      </div>
    );
  }

  return null;
};

export default AdminPanel;
