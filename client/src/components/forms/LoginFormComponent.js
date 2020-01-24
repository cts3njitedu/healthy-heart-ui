import React, { Component } from 'react'
import "../../styles/loginform.css"
import { Button, Form, FormGroup } from 'react-bootstrap'
import Textbox from './Textbox'



class LoginFormComponent extends Component {

    constructor(props) {
        super(props)
        console.log("Display", this.props);
    }

    render() {
        return (
            <Form onSubmit={this.props.handleSubmit}>
                <div className="loginFormDiv">
                    <FormGroup><Textbox field={this.props.fields.username} handleChange={this.props.handleChange} handleBlur={this.props.handleBlur} /></FormGroup>
                    <FormGroup><Textbox field={this.props.fields.password} handleChange={this.props.handleChange} handleBlur={this.props.handleBlur} /></FormGroup>
                    <FormGroup><Textbox field={this.props.fields.confirmPassword} handleChange={this.props.handleChange} handleBlur={this.props.handleBlur} /></FormGroup>
                    <FormGroup><Textbox field={this.props.fields.firstname} handleChange={this.props.handleChange} handleBlur={this.props.handleBlur} /></FormGroup>
                    <FormGroup><Textbox field={this.props.fields.lastname} handleChange={this.props.handleChange} handleBlur={this.props.handleBlur} /></FormGroup>
                    <FormGroup><Textbox field={this.props.fields.email} handleChange={this.props.handleChange} handleBlur={this.props.handleBlur} /></FormGroup>
                    {this.props.pageErrors && this.props.pageErrors.map((error) => <p key={error}>{error}</p>)}
                    <Button type="submit" disabled={this.props.submitting}>Submit</Button>
                </div>
            </Form>
        )
    }






}


export default LoginFormComponent