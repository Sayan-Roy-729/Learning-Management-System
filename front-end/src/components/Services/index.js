import React from 'react';
import Icon1 from '../../images/Icon1.svg'
import Icon2 from '../../images/Icon2.svg'
import Icon3 from '../../images/Icon3.svg'
import {
    ServicesContainer,
    ServicesH1,
    ServicesWrapper,
    ServicesCard,
    ServicesIcon,
    ServicesH2,
    ServicesP
} from './ServicesElements'
const Services = () => {
    return (
        <ServicesContainer id="services">
        <ServicesH1>Our Courses</ServicesH1>
        <ServicesWrapper>

            <ServicesCard>
                <ServicesIcon src={Icon1} />
                <ServicesH2>Web Development</ServicesH2>
                <ServicesP>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </ServicesP>
            </ServicesCard>

            <ServicesCard>
                <ServicesIcon src={Icon2} />
                <ServicesH2>Android Development </ServicesH2>
                <ServicesP>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</ServicesP>
            </ServicesCard>

            <ServicesCard>
                <ServicesIcon src={Icon3} />
                <ServicesH2>Artificial Intelligence</ServicesH2>
                <ServicesP>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</ServicesP>
            </ServicesCard>

        </ServicesWrapper>
        </ServicesContainer>
    );
};
 
export default Services ;
