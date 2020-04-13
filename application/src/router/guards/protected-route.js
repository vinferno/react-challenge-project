import React from 'react';
import {Redirect, Route} from "react-router-dom";
import store from './../../redux/store';

function PrivateRoute ({component: Component, ...rest}) {

    return (
        <Route
            {...rest}
            render={
                (props) => {
                    const currentState = store.getState();
                    if (currentState && currentState.auth && currentState.auth.token) {
                        return <Component {...props} />;
                    } else {
                        return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                    }
                }
            }
        />
    )
}

export default PrivateRoute;
