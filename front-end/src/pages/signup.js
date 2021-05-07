import { useState } from 'react';

import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import SignUp from '../components/SignUp/SignUp';

const SignUpPage = props => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(oldState => {
            return !oldState;
        });
    };
    return (
        <>  
            <Sidebar isOpen = {isOpen} toggle = {toggle}/>
            <Navbar toggle = {toggle}/>
            <HeroSection />
            <SignUp />
        </>
    );
};

export default SignUpPage;