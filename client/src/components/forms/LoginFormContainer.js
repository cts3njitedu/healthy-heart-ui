import React, { Component } from 'react'
import { getLoginPage, handleFormChange, handleFormBlur, handleSubmit} from '../../actions/loginAction'
import { connect } from 'react-redux'
import LoginFormComponent from './LoginFormComponent';
import { convertLoginFields } from '../../selectors/loginFormSelector';
import {isEqual} from 'lodash'
import Loading from '../Loading';
class LoginFormContainer extends Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            fields: {}
        }
    }
    componentDidMount() {
        if (this.props.match.url === "/logout") {

        } else {
            console.log("This is the url:", this.props.match.url)
            this.props.getLoginPage(this.props.match.url);
        }
        
    }

    componentDidUpdate (prevProps) {
        if (localStorage.getItem("accessToken")) {
            this.props.history.push("/")
        }
        if (!isEqual(prevProps.fields, this.props.fields)) {
            this.setState({fields:this.props.fields })
        }
    }
    handleChange(event) {
        const {name, value, id} = event.target; 
    
        this.props.handleFormChange({
            name: name,
            value: value,
            id: id
        })
    }

    handleBlur(event) {
        const {name} = event.target
        this.props.handleFormBlur({
            [name]: this.state.fields[name]
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state.fields, this.props.match.url)
    }
    render(){
        const { error, loading, fields, submitting, pageErrors,submitted } = this.props;
        if (submitting) {
            return (
                <div>Submitting...</div>
            )
        }
        else if (loading) {
            return (
                <Loading />
            )
        }
        else if (error) {
            return (
                <div>Error getting page...</div>
            )
        }
        else{
            console.log("Has submitted: ", submitted)
            if (fields !== null) {
                console.log("State has changed: ", this.state.fields)
                return (
                    <div>
                        
                        <LoginFormComponent 
                            fields={fields}
                            submitting= {submitting}
                            pageErrors = {pageErrors}
                            handleChange={this.handleChange}
                            handleBlur={this.handleBlur}
                            handleSubmit={this.handleSubmit} />
                    </div>
                        
                        
                )
            }
            return(
                <Loading />
            )
        }
    }

}






function mapStateToProps(state) {
    return {
    
           fields: convertLoginFields(state),
           loading: state.loginForm.loading,
           error: state.loginForm.error,
           submitting: state.loginForm.submitting,
           submitError: state.loginForm.submitError,
           pageErrors: state.loginForm.page.errors,
           submitted: state.loginForm.submitted
        }
        
}

const mapDispatchToProps = {

    getLoginPage,
    handleFormChange,
    handleFormBlur,
    handleSubmit

}




export default connect(mapStateToProps,mapDispatchToProps)(LoginFormContainer);