import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {reRoutePage} from '../../actions/commonAction'
import {isEqual} from 'lodash'
import { ROUTETYPE } from '../../constants/page_constants';
class PageRouter extends Component {
    constructor(props) {
        super(props);
        console.log("Reroute Page")
    }
    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.routeMetaData, this.props.routeMetaData)) {
            console.log("Rerouting:", this.props.routeMetaData)
            if (this.props.routeMetaData.routeUrl.length !== 0){
                if (ROUTETYPE.PUSH === this.props.routeMetaData.routeType) {
                    this.props.history.push(this.props.routeMetaData.routeUrl)
                } else if (ROUTETYPE.REPLACE === this.props.routeMetaData.routeType) {
                    this.props.history.replace(this.props.routeMetaData.routeUrl)
                }
            }
            
        }
    }
    render() {
        return (
            <div></div>
        )
    }
}


function mapStateToProps(state) {
    return {
        routeMetaData: state.common.routeMetaData
    }
        
}

const mapDispatchToProps = {
    reRoutePage
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PageRouter));