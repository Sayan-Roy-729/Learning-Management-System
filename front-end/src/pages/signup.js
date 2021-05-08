import { useState } from 'react';
import { useSelector } from 'react-redux';

import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import SignUp from '../components/SignUp/SignUp';
import Loader from '../components/Loader/Loader';

const SignUpPage = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const authState = useSelector((state) => state.authReducer);

    const toggle = () => {
        setIsOpen((oldState) => {
            return !oldState;
        });
    };

    if (authState.loading) {
        return <Loader />;
    } else {
        return (
            <>
                <Sidebar isOpen={isOpen} toggle={toggle} />
                <Navbar toggle={toggle} />
                <HeroSection />
                <SignUp />
            </>
        );
    }
};

export default SignUpPage;
