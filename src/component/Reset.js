import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../context/UserContext';
import Swal from 'sweetalert2';

const Reset = (props) => {
    const [email,setEmail]=useState('')
    const {resetPasswordEmail}=useContext(AuthContext);

    const handleEmail=(e)=>{
        const email=e.target.value;
        setEmail(email)
    }
    const handleResetPassword=()=>{
        resetPasswordEmail(email)
        .then(()=>{
            console.log('password email sent');
            Swal.fire('reset password email sent')
            props.onHide()
        })
        .catch(error=>{
            console.error(error)
        })
    }
    return (
        <div>
             <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        
      </Modal.Header>
      <Modal.Body>
        <h4>Reset password</h4>
        <Form.Group onBlur={handleEmail} className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name='email' placeholder="Enter email" />
        </Form.Group>
        <Button onClick={handleResetPassword} variant="primary" type="submit">
            Submit
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
        </div>
    );
};

export default Reset;