import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const useShowPassword = () => {
    const [show,setShow]=useState(false)
    const icon=<div onClick={()=>setShow(!show)}>
        {
        show?
        <FontAwesomeIcon icon={faEye} />
        :
        <FontAwesomeIcon icon={faEyeSlash} />
        }
        </div>

        const textOrPassword= show ? 'text':'password'
            
       
    return [icon,textOrPassword]
};

export default useShowPassword;