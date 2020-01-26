import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function LandingPage() {
    return (

        <Grid fluid={true}>

            <Row className="landingPageLayout">
                <Col style={{ height: "100%", border: "1px solid black" }} md={2}>
                    <Link to="/locations">
                        <div className="leftPanel">
                            View Locations
                               </div>
                    </Link>
                    <Link to="/workouts">
                        <div className="leftPanel">
                            Workouts
                        </div>

                    </Link>

                </Col>
                <Col style={{ height: "100%", border: "8px solid black" }} md={8}>

                </Col>
                <Col style={{ height: "100%", border: "1px solid black" }} md={2}>

                </Col>
            </Row>


        </Grid>


    )
}


export default LandingPage