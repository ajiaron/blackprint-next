import React, {useState, useEffect, useRef} from 'react';
import { motion, useAnimation } from 'framer-motion';
import styles from '../../styles/Carousel.module.scss'

const renderIcons = () => (
    <div className={styles['carousel-icon-wrapper']}>
        <div className={[styles['carousel-icon-container'], styles['circleoc-icon']].join(' ')} />
        <div className={[styles['carousel-icon-container'], styles['nebula-icon']].join(' ')} />
        <div className={[styles['carousel-icon-container'], styles['dashbill-icon']].join(' ')} />
        <div className={[styles['carousel-icon-container'], styles['ksig-icon']].join(' ')} />
        <div className={[styles['carousel-icon-container'], styles['peaking-duck-icon']].join(' ')} />
        <div className={[styles['carousel-icon-container'], styles['legacy-icon']].join(' ')} />
        <div className={[styles['carousel-icon-container'], styles['noservice-icon']].join(' ')}>
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
        <div className={styles['carousel-container']}>

            <motion.div 
            initial={{ x: 0 }}
            animate={controls}
            className={styles['carousel-content-container']}>
              {renderIcons()}
              {renderIcons()}
            </motion.div>
        </div>
    );
}

export default Carousel;
