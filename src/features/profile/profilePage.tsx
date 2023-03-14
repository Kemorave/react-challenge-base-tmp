import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../auth/auth.slice';


const ProfilePage = () => {
    const user = useSelector(authSelector);

    return (
        <div>
            
        </div>
    );
};

export default ProfilePage;