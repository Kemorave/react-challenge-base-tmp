import React from 'react';
import { useFormAction } from 'react-router-dom';

function Login() {
    const s= useFormAction();
    return (
        <div>
            <h1>Login</h1>
        </div>
    );
}

export default Login;