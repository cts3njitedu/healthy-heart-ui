import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    console.log("Public Access Token: " , rest.path, restricted)
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            localStorage.getItem("accessToken") && restricted ?
                <Redirect to="/about" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute