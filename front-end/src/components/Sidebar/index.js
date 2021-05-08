import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SideBtnWrap,
    SidebarRoute,
    SidebarRoutePage,
} from './SidebarElements';
import { userSignOut } from '../../actions/authAction';
import { clearCourseState } from '../../actions/courseAction';

const Sidebar = ({ isOpen, toggle }) => {
    const authState = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    const signOutHandler = () => {
        dispatch(clearCourseState());
        dispatch(userSignOut());
    };

    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarRoutePage to="/" onClick={toggle}>
                        Home
                    </SidebarRoutePage>
                    <SidebarLink to="discover" onClick={toggle}>
                        Placement Program
                    </SidebarLink>
                    <SidebarLink to="/dashboard" onClick={toggle}>
                        Mock Interview
                    </SidebarLink>
                    {
                        authState.user && (
                            <SidebarRoutePage to="/dashboard" onClick={toggle}>
                                Dashboard
                            </SidebarRoutePage>
                        )
                    }

                    {
                        authState.user === null && (
                            <SidebarRoutePage to="/signup" onClick={toggle}>
                                Sign Up
                            </SidebarRoutePage>
                        )
                    }
                    
                </SidebarMenu>
                {
                        authState.user === null ? (
                            <SideBtnWrap onClick={toggle}>
                               <SidebarRoute to="/signin">Sign In</SidebarRoute>
                            </SideBtnWrap>
                        ) : (
                            <SideBtnWrap to="/signup" onClick={toggle}>
                                <SidebarRoute onClick = {signOutHandler}>Sign Out</SidebarRoute>
                            </SideBtnWrap>
                        )
                    }
                {/* <SideBtnWrap>
                    <SidebarRoute to="/signin">Sign In</SidebarRoute>
                </SideBtnWrap> */}
            </SidebarWrapper>
        </SidebarContainer>
    );
};

export default Sidebar;
