import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/UserContext';

const Header = () => {
    const {logOut, user } = useContext(AuthContext);

        const handleLogout=()=>{
            logOut()
            .then(()=>{
                console.log('logout successful');
            })
            .catch(error=>{
                console.error(error)
            })
        }
    return (

        

        <div className='bg-secondary text-center p-3 text-white d-flex align-items-center justify-content-center'>
            
                <Link className='text-decoration-none me-3 text-white fw-semibold' to='/'>Home</Link>
                <Link className='text-decoration-none me-3 text-white fw-semibold' to='/orders'>Orders</Link>
                <Link className='text-decoration-none me-3 text-white fw-semibold' to='register'>Register</Link>
                <Link className='text-decoration-none me-3 text-white fw-semibold' to='login'>Login</Link>
          
            
               <div className='mt-3'>
               {user?.uid && <div><p>{user.displayName} <img style={{width:'50px'}} className='rounded-circle' src={user.photoURL} alt="" /></p></div>}
               </div>
                {
                    user?.uid ?  
                    <button onClick={handleLogout}>Sign Out</button>
                    :<Link to='/login'><button>Sign In</button></Link>
                }
          
        </div>



    );
};

export default Header;