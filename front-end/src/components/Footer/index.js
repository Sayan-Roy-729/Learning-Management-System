import React from 'react';
import {animateScroll as scroll } from 'react-scroll';
import {
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaTwitter,
    FaLinkedin
} from 'react-icons/fa';
import {FooterContainer,
    FooterWrap,
    FooterLinksContainer,
    FooterLinksWrapper,
    FooterLinkItems,
    FooterLinkTitle,
    FooterLink,
    SocialMedia,
    SocialMediaWrap,
    SocialLogo,
    WebsiteRights,
    SocialIcons,
    SocialIconLink

    } from './FooterElements';

    

const Footer = () => {
    const toggleHome = () => {
        scroll.scrollToTop();
     };

    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                <FooterLinksWrapper>
                    <FooterLinkItems>
                        <FooterLinkTitle> About us </FooterLinkTitle>
                            <FooterLink to="/signin">How it works</FooterLink>
                            <FooterLink to="/signin">Testimonials</FooterLink>
                            <FooterLink to="/signin">Careers</FooterLink>
                            <FooterLink to="/signin">Investors</FooterLink>
                            <FooterLink to="/signin">Terms of Service</FooterLink>
                    </FooterLinkItems>
                    <FooterLinkItems>
                        <FooterLinkTitle> Contact Us </FooterLinkTitle>
                            <FooterLink to="/signin"> Contact </FooterLink>
                            <FooterLink to="/signin">Support</FooterLink>
                            <FooterLink to="/signin">Desinations</FooterLink>
                            <FooterLink to="/signin">Sponsorships</FooterLink>
                            <FooterLink to="/signin">Terms of Service</FooterLink>                           
                    </FooterLinkItems>
                </FooterLinksWrapper>
                <FooterLinksWrapper>
                    <FooterLinkItems>
                        <FooterLinkTitle> Videos </FooterLinkTitle>
                            <FooterLink to="/signin">Submit Video</FooterLink>
                            <FooterLink to="/signin">Ambassadoes</FooterLink>
                            <FooterLink to="/signin">Agency</FooterLink>
                            <FooterLink to="/signin">Influencer</FooterLink>
                            <FooterLink to="/signin">Terms of Service</FooterLink>
                    </FooterLinkItems>
                    <FooterLinkItems>
                        <FooterLinkTitle> Social Media </FooterLinkTitle>
                            <FooterLink to="/signin">Facebook</FooterLink>
                            <FooterLink to="/signin">Instagram</FooterLink>
                            <FooterLink to="/signin">Youtube</FooterLink>
                            <FooterLink to="/signin">twitter</FooterLink>
                            <FooterLink to="/signin">WhatsApp</FooterLink>
                    </FooterLinkItems>
                </FooterLinksWrapper>
                </FooterLinksContainer>
                <SocialMedia>
                <SocialMediaWrap>
                <SocialLogo to='/' onClick={toggleHome}>
                        CampusX
                </SocialLogo>
                <WebsiteRights>CampusX ❤ {new Date().getFullYear()}
                </WebsiteRights>
                <SocialIcons>
                    <SocialIconLink href="/" target="_blank" aria-label="Facebook">
                        <FaFacebook/>
                    </SocialIconLink>
                    <SocialIconLink href="/" target="_blank" aria-label="Instagram">
                        <FaInstagram/>
                    </SocialIconLink>
                    <SocialIconLink href="/" target="_blank" aria-label="YouTube">
                        <FaYoutube/>
                    </SocialIconLink>
                    <SocialIconLink href="/" target="_blank" aria-label="Twitter">
                        <FaTwitter/>
                    </SocialIconLink>
                    <SocialIconLink href="/" target="_blank" aria-label="Linkedin">
                        <FaLinkedin/>
                    </SocialIconLink>
                </SocialIcons>
                </SocialMediaWrap>
                </SocialMedia>                
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer
