import React from 'react'
import logo from '../../logo512.png';
import {Nav, NavSpan, NavLink, NavMenu, Bars, NavBtn, NavBtnLink} from "./NavbarElements"

const Navbar = () => {
    return (
        <>
          <Nav>
              <NavSpan>
                    <NavLink to="/">
                    <img src={logo} className = "logo" alt="logo"/>
                    </NavLink>
                    <Bars />
                    <NavMenu>
                        <NavLink to="/visualize" activeStyle>
                            Visualize
                        </NavLink>
                        <NavLink to="/alert" activeStyle>
                            Alert
                        </NavLink>
                        <NavLink to="/control" activeStyle>
                            Control
                        </NavLink>
                        <NavLink to="/manual" activeStyle>
                            Manual
                        </NavLink>
                    </NavMenu>
                    <NavBtn>
                        <NavBtnLink to="/signin">Sign In</NavBtnLink>
                    </NavBtn>
              </NavSpan>
          </Nav>  
        </>
    );
};

export default Navbar;