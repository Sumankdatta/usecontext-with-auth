import { createBrowserRouter } from "react-router-dom"
import Main from "../layout/Main"
import Home from "../component/Home"
import Order from "../component/Order"
import Register from "../component/Register"
import Login from "../component/Login"
import ResetPassword from "../component/ResetPassword"
import PrivateRoute from "./PrivateRoute"

export const router=createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/orders',
                element:<PrivateRoute><Order></Order></PrivateRoute>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/resetpassword',
                element:<ResetPassword></ResetPassword>
            },
        ]
    }
])