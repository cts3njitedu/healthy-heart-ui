import React from 'react'
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import "../styles/header.css"
import { connect } from 'react-redux'
function Navigation(props) {
  return (
  
      <div style={{width:"100%", border: "3px solid black", padding: "1%", backgroundColor: "lightblue"}}>
        <Navbar fluid={true} inverse collapseOnSelect style={{height:"100%", backgroundColor:"azure"}}>

          <Navbar.Brand>
            <NavLink to="/"><p className="heartIcon">Healthful Heart</p></NavLink>
          </Navbar.Brand>

          <Nav>
            <NavItem componentClass='span'>
              <Link to="/" ><p className="heartLinks">Home</p></Link>
            </NavItem>
            {props.isAccessTokenEnabled?
            <NavItem componentClass='span'>
              <Link to="/about" ><p className="heartLinks">About Page</p></Link>
            </NavItem> : null}
            {props.isAccessTokenEnabled ?<NavItem componentClass='span'>
              <Link to="/dashboard" ><p className="heartLinks">Dashboard</p></Link>
            </NavItem>: null}
          </Nav>
          {!props.isAccessTokenEnabled ? <Nav pullRight>
            <NavItem componentClass='span'>
              <Link to="/login"><p className="heartLinks">Login</p></Link>
            </NavItem>
            <NavItem componentClass='span'>
              <Link to="/signup"><p className="heartLinks">Signup</p></Link>
            </NavItem>
          </Nav> : <Nav pullRight>
              <NavItem componentClass='span'>
                <Link to="/logout">Logout</Link>
              </NavItem>
            </Nav>}
        </Navbar>
      </div>

  

  )

}



function mapStateToProps(state) {
  return {
  
      isAccessTokenEnabled: state.user.isAccessTokenEnabled
      }
      
}

export default connect(mapStateToProps,null)(Navigation);