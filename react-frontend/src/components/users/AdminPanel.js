import{ React, useState} from 'react';

const AdminPanel = ({user}) => {

  
  if (user && user.role === process.env.AdminPanel) {
    return (
      <div>
        
      </div>
    )
  }

  return null;
}

export default AdminPanel;