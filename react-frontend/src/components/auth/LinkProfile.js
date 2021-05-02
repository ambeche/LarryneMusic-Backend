import React from 'react';
import {Link} from 'react-router-dom';

const LinkProfile = ({profile, user, data}) => {
    if (profile) {
        return (
           (!user?.roleValue || !data?.user?.roleValue) && (
             <Link style={{padding: 10}} to="/profile">
               {data?.user?.fullname ?? user?.fullname}
             </Link>
           )
         );
    }

    return null;
}

export default LinkProfile;