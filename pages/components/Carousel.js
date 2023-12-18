import React, {useState, useEffect, useRef} from 'react';
import { motion, useAnimation } from 'framer-motion';
import '../../styles/Carousel.module.scss'

const renderIcons = () => (
    <div className='carousel-icon-wrapper'>
        <div className='carousel-icon-container circleoc-icon' />
        <div className='carousel-icon-container nebula-icon' />
        <div className='carousel-icon-container dashbill-icon' />
        <div className='carousel-icon-container ksig-icon' />
        <div className='carousel-icon-container peaking-duck-icon' />
        <div className='carousel-icon-container legacy-icon' />
        <div className='carousel-icon-container noservice-icon'>
            NO SERVICE*
        </div>
    </div>
)

const Carousel = ({screenWidth}) => {
    const controls = useAnimation();
    const iconsRef = useRef(null)

    useEffect(() => {
        const loopAnimation = async () => {
            // animate to half the width to show the second set
            await controls.start({ x: (screenWidth>480)?'-50%':'-75%', transition: { duration: 20, ease: "linear" } });
            // instantly resets to the start
            controls.set({ x: '0%' });
            loopAnimation();
        };
            loopAnimation();
    }, [controls]);

    return (
        <div className='carousel-container'>

            <motion.div 
            initial={{ x: 0 }}
            animate={controls}
            className='carousel-content-container'>
              {renderIcons()}
              {renderIcons()}
            </motion.div>
        </div>
    );
}

export default Carousel;
