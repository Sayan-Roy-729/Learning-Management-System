import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { animateScroll as scroll } from 'react-scroll';
import { useSelector, useDispatch } from 'react-redux';

import {
    Nav,
    NavbarContainer,
    NavLogo,
    MobileIcon,
    NavMenu,
    NavItem,
    NavLinks,
    NavBtn,
    NavBtnLink,
    SignupLinks,
} from './NavbarElements';
import { userSignOut } from '../../actions/authAction';
import { clearCourseState } from '../../actions/courseAction';

const Navbar = ({ toggle }) => {
    const [scrollNav, setScrollNav] = useState(false);

    const authenticationState = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeNav);
    }, []);

    const toggleHome = () => {
        scroll.scrollToTop();
    };

    // ? Sign Out Handler
    const signOutHandler = () => {
        dispatch(clearCourseState());
        dispatch(userSignOut());
    };

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <Nav scrollNav={scrollNav}>
                    <NavbarContainer>
                        <NavLogo to="/" onClick={toggleHome}>
                            CampusX
                        </NavLogo>
                        <MobileIcon onClick={toggle}>
                            <FaBars />
                        </MobileIcon>
                        <NavMenu>
                            <NavItem>
                                <NavLinks
                                    to="home"
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    exact="true"
                                    offset={-80}
                                >
                                    Home
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks
                                    to="discover"
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    exact="true"
                                    offset={0}
                                >
                                    Placement Program
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks
                                    to="courses"
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    exact="true"
                                    offset={-80}
                                >
                                    Mock Interview
                                </NavLinks>
                            </NavItem>
                            {authenticationState.user !== null && (
                                <NavItem>
                                    <SignupLinks
                                        to="/dashboard"
                                        smooth={true}
                                        duration={500}
                                        spy={true}
                                        exact="true"
                                        offset={-80}
                                        style={{textDecoration: 'none'}}
                                    >
                                        Dashboard
                                    </SignupLinks>
                                </NavItem>
                            )}
                            {authenticationState.user === null && (
                                <NavItem>
                                    <SignupLinks
                                        to="/signup"
                                        smooth={true}
                                        duration={500}
                                        spy={true}
                                        exact="true"
                                        offset={-80}
                                    >
                                        Sign Up
                                    </SignupLinks>
                                </NavItem>
                            )}
                        </NavMenu>
                        <NavBtn>
                            <div>
                                {authenticationState.user ? (
                                    <NavBtnLink onClick={signOutHandler}>
                                        Sign Out
                                    </NavBtnLink>
                                ) : (
                                    <NavBtnLink to="/signin">
                                        Sign In
                                    </NavBtnLink>
                                )}
                            </div>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    );
};

export default Navbar;
