import React from 'react';
import styles from '../../styles/Catalog.module.scss'
import Button from './Button';
import {motion, AnimatePresence, useScroll,useMotionValueEvent, useAnimation, inView} from 'framer-motion'


const Catalog = ({scrollY, screenWidth}) => {
    return (
        <div className={styles['catalog-container']} id={"catalog"}>
            <motion.div
          //  whileInView={{x:-scrollY/8}}
             style={{
                
                x:(screenWidth>480)? -scrollY / 5:-scrollY/3, // Adjust the divisor to control scroll speed
             }}
             className={styles['catalog-content-container']}>
                <div className={styles["catalog-content-item"]}/>
                <div className={styles["catalog-content-item"]}/>
                <div className={styles["catalog-content-item"]}/>
                <div className={styles["catalog-content-item"]}/>
                <div className={styles["catalog-content-item"]}/>
                
            </motion.div>
          
        </div>
    );
}

export default Catalog;
