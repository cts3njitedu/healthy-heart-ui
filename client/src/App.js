import React from 'react'
import Header from './components/Header'
import store from './store/index'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import About from './components/About'
import LandingPage from './LandingPage'
import LoginFormContainer from './components/forms/LoginFormContainer'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './components/Dashboard'
import PublicRoute from './components/PublicRoute'

function App() {
    return (


        <BrowserRouter>
            <Provider store={store}>
                <Header />
                {/* <MainContent /> */}
                <Switch>
                    <PublicRoute exact restricted = {false} path="/" component={LandingPage} />
                    {/* <PrivateRoute exact path="/about">
                        <About />
                    </PrivateRoute> */}
                    <PrivateRoute component={About} path="/about" exact />
                    <PrivateRoute component={Dashboard} path="/dashboard" exact />
                    <PublicRoute key="login-user" path="/login" restricted={true} component={LoginFormContainer} exact/>
                    <PublicRoute key="signup-user" path="/signup" restricted={true} component={LoginFormContainer} exact />
                    <Route path="/logout" component={LoginFormContainer} />
                </Switch>



            </Provider>
        </BrowserRouter>


    )
}


export default App