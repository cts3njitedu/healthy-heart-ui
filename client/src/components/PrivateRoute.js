import { Redirect, Route } from "react-router-dom";
import React from "react"



const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            localStorage.getItem("accessToken") ? <Component {...props} /> 
                :<Redirect to="/login"/> 
        )} />
    )
}

export default PrivateRoute
