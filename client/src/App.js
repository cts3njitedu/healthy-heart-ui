import React from 'react'
import Header from './components/Header'
import store from './store/index'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import About from './components/About'
import LandingPage from './components/LandingPage'
import LoginFormContainer from './components/forms/LoginFormContainer'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './components/Dashboard'
import PublicRoute from './components/PublicRoute'
import Locations from './components/Locations'
import Calendar from './components/Calendar'
import WorkoutDaysPage from './components/workout_components/WorkoutDaysPage'
import PageRouter from './components/utility_components/PageRouter'
import ConfirmationModal from './components/forms/ConfirmationModal'

function App() {
    return (

        
        <BrowserRouter>
            <Provider store={store}>
                <PageRouter />
                <ConfirmationModal />
                <Header />
                {/* <MainContent /> */}
                <Switch>
                    <PublicRoute exact restricted = {false} path="/" component={LandingPage} />
                    <PrivateRoute component={About} path="/about" exact />
                    <PrivateRoute component={Locations} path="/locations" exact />
                    <PrivateRoute component={Dashboard} path="/dashboard" exact />
                    <PrivateRoute component={Calendar} path="/calendar" exact />
                    <PrivateRoute component={WorkoutDaysPage} path="/workoutDays"/>
                    <PublicRoute key="login-user" path="/login" restricted={true} component={LoginFormContainer} exact/>
                    <PublicRoute key="signup-user" path="/signup" restricted={true} component={LoginFormContainer} exact />
                    <Route path="/logout" component={LoginFormContainer} />
                </Switch>



            </Provider>
        </BrowserRouter>
      

    )
}


export default App