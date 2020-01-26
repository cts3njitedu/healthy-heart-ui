import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

function Locations(props) {
    const { isAccessTokenEnabled } = props

    if (!isAccessTokenEnabled) {
        return <Redirect to="/login" />
    } else{
        return (
            <div>
                Location Page Under Construction
            </div>
        )
    }
   


}



function mapStateToProps(state) {
    return {

        isAccessTokenEnabled: state.user.isAccessTokenEnabled,
        loading: state.about.loading
    }

}




export default connect(mapStateToProps, null)(Locations);