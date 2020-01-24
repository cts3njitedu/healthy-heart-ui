import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAboutPage } from '../actions/aboutAction'
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
class About extends Component {

    componentDidMount() {

        this.props.getAboutPage()


    }

    render() {
        console.log("In about page!!!!!!!!", this.props)
        const {loading} = this.props
        if (!this.props.isAccessTokenEnabled) {
            return <Redirect to="/login" />
        }
        if (loading) {
            return (
                <Loading />
            )
        }
        return (
            <div>This is the about page</div>
        )
    }

}




const mapDispatchToProps = {

    getAboutPage

}

function mapStateToProps(state) {
    return {
    
           isAccessTokenEnabled: state.user.isAccessTokenEnabled,
           loading: state.about.loading
        }
        
}




export default connect(mapStateToProps, mapDispatchToProps)(About);