import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useShowPassword from '../hookes/useShowPassword';

const Register = () => {
    const [error,setError]=useState('');
    const [isDisable,setIsDisable]=useState(true)
    const {user,loading,googleLogin,githubLogin,facebookLogin,updateUserProfile,createUser,emailVerification}=useContext(AuthContext);
    const [icon,textOrPassword]=useShowPassword();
    const navigate=useNavigate();
    if(loading){
        return <p>loading.....</p>
    }

    const handleSubmit=(event)=>{
        event.preventDefault()
        const form=event.target;
        const name=form.name.value;
        const url=form.url.value;
        const email=form.email.value;
        const password=form.password.value;

        if(!/^\S+@\S+\.\S+$/.test(email)){
            setError('email not correct')
            return
        }

        if(password.length <8){
            setError('Password should be 8 character')
            return
        }
        if(!/(?=.*[!@#$%^&*])/.test(password)){
            setError('Need one special character')
            return
        }

        console.log(name,url,email,password);
        createUser(email,password)
        .then(result=>{
            const user=result.user;
            user.displayName=name;
            user.photoURL=url;
            
            console.log(user)
            updateUserProfile(name,url)
            .then(()=>{
                console.log('update name')
            })
            .catch(error=>{
                console.error(error)
            });

            emailVerification()
            .then(()=>{
                alert('email verification send')
            })
            form.reset()
            toast.success('Successful')
            navigate('/')
            
        })
        .catch(error=>{
            console.error(error)
        })


    }

    const handleFacebook=()=>{
        facebookLogin()
        .then(result=>{
            const user=result.user;
            console.log(user)
            navigate('/')
        })
        .catch(error=>{
            console.error(error)
        })
    }
    const handleGithub=()=>{
        githubLogin()
        .then(result=>{
            const user=result.user;
            console.log(user)
            navigate('/')
        })
        .catch(error=>{
            console.error(error)
        })
    }

    const handleGoogle=()=>{
        googleLogin()
        .then(result=>{
            const user=result.user;
            console.log(user)
            navigate('/')
        })
        .catch(error=>{
            console.error(error)
        })

    }
    return (
        <div className='mx-auto mt-5 w-50 shadow-lg p-3 mb-5 bg-body-tertiary rounded p-5'>
        <h2 className='mb-4'>Register</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail" >
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" name='name' placeholder="Enter your name" required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail" >
                <Form.Label>Photo url</Form.Label>
                <Form.Control type="url" name='url' placeholder="Photo url" required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail" >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3 position-relative" controlId="formBasicPassword" >
                <Form.Label>Password</Form.Label>
                
                <Form.Control type={textOrPassword} name='password' placeholder="Password" required/>

                <p className='text-danger'>{error}</p>
                <span style={{position:'absolute',top:'35px',marginLeft:'450px'}}>{icon}</span>
            </Form.Group>
            <Form.Group onClick={()=>setIsDisable(!isDisable)} className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button disabled={isDisable} variant="primary" type="submit">
                Submit
            </Button>
            <p>Already have an account ? please <Link to='/login'>Login</Link></p>
            <ToastContainer />
        </Form>
        <div className=''>
        <Button onClick={handleFacebook} variant="primary me-2">Facebook</Button>
      <Button onClick={handleGoogle} variant="secondary me-2">Google</Button>
      <Button onClick={handleGithub} variant="success me-2">Github</Button>
        </div>
       
    </div>
    );
};

export default Register;