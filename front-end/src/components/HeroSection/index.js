import React, {useState} from 'react';
import Video from '../../video/video.mp4';
import { Button } from '../ButtonElement';
import { HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HeroBtnWrapper, ArrowForward, ArrowRight } from './HeroElements';

const HeroSection = () => {
    const [hover,setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

return (
        <HeroContainer>
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4'/>
            </HeroBg>
            <HeroContent>
                <HeroH1>
                Perfect platform for your coding career.
                </HeroH1>
                <HeroP>
                A JOURNEY TOWARDS PURSUIT OF EXCELLENCE AND PEACE
                </HeroP>
                <HeroBtnWrapper>
                    <Button to="singup" onMouseEnter={onHover}
                    onMouseLeave={onHover} 
                    primary='true'
                    dark='true'
                    >
                        Get started {hover ? <ArrowForward /> : <ArrowRight/>}
                    </Button>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection;
