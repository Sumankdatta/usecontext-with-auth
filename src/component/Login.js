import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/UserContext';
import Reset from './Reset';
import Swal from 'sweetalert2';
import useShowPassword from '../hookes/useShowPassword';





const Login = () => {
    const [modalShow, setModalShow] = useState(false);
    const {userLogin,loading}=useContext(AuthContext);
    const [icon,textOrPassword]=useShowPassword()

   if(loading){
    return <p>Loading......</p>
   }

    const handleLogin=(event)=>{
        event.preventDefault()
        const form=event.target;
        const email=form.email.value;
        const password=form.password.value;
        console.log(email,password);
        userLogin(email,password)
        .then(result=>{
            const user=result.user;
            console.log(user);
            Swal.fire('Log in successfully')
            form.reset()
           
        })
        .catch(error=>{
            console.error(error)
        })
    }
    
    return (
        <div className='mx-auto mt-5 w-50 shadow-lg p-3 mb-5 bg-body-tertiary rounded p-5'>
        <h2 className='mb-4'>Login</h2>
    <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name='email' placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type={textOrPassword} name='password' placeholder="Password" />
               <span style={{position:'absolute',top:'35px',marginLeft:'450px'}} className=''>{icon}</span>
        </Form.Group>
     
        <Button variant="primary" type="submit">
            Submit
        </Button>
        <p>New to this website ? please <Link to='/register'>Register</Link></p>
        <p>Forget password ? please <Link to='/resetpassword'>Reset password</Link></p>
    </Form>

    <>
    <p>Forget password ? please (with modal) <Link onClick={() => setModalShow(true)}>Reset password</Link></p>
     

     <Reset
     show={modalShow}
     onHide={() => setModalShow(false)}
     ></Reset>
    </>
   
    </div>
    );
};

export default Login;