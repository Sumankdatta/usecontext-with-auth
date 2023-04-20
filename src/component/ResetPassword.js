import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../context/UserContext';
import Swal from 'sweetalert2';

const ResetPassword = () => {
    const [email,setEmail]=useState('');
    const {resetPasswordEmail}=useContext(AuthContext);

    const handleEmail=(event)=>{
        const email=event.target.value;
        setEmail(email)
    }

    const handleResetPassword=()=>{
        resetPasswordEmail(email)
        .then(()=>{
            console.log('reset password email sent')
            Swal.fire('reset password email sent')
        })
        .catch(error=>{
            console.error(error)
        })
    }
    return (
        <div  className='mx-auto mt-5 w-50 shadow-lg p-3 mb-5 bg-body-tertiary rounded p-5'>
            <h3>Reset Password</h3>
            <Form.Group onBlur={handleEmail} className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name='email' placeholder="Enter email" />
        </Form.Group>
        <Button onClick={handleResetPassword} variant="primary" type="submit">
            Submit
        </Button>
        </div>
    );
};

export default ResetPassword;