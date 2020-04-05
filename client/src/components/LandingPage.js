import React from 'react'
import { Link } from 'react-router-dom'


function LandingPage() {
    return (
        <div className="landingPageContainer"> 
            <div className="landingPageItem">
                <div className="leftPanelItem">
                    <Link to="/locations">View Locations</Link>
                </div>
                <div className="leftPanelItem">
                    Workouts
                </div>
            </div>
            <div className="landingPageItem">
                <div className="viewCalendarItem">
                    <Link to="/calendar">View Calendar</Link>
                </div>
            </div>
        </div>
    )
}


export default LandingPage