import{ React, useState} from 'react';

const AdminPanel = ({user}) => {

  
  if (user && user?.role === user?.roleValue) {
    return (
      <div>
         welcome melh
      </div>
    )
  }

  return null;
}

export default AdminPanel;