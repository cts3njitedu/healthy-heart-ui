import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import LoginFormComponent from './forms/LoginFormComponent'

class MainContent extends Component {
    render() {
        return (
            <Grid>
                <Row></Row>
                <Row>
                    <Col></Col>
                    <Col lg={12} className="divMain"><LoginFormComponent /></Col>
                    <Col></Col>
                </Row>
            </Grid>
        )
    }
}




export default MainContent