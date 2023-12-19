import React, { useState, useEffect, useRef } from 'react';
import {motion, AnimatePresence, useScroll, useAnimation, inView} from 'framer-motion'
import styles from '../../styles/Calender.module.scss'
const Calender = ({ onClose, onBlur }) => {
    const modalRef = useRef(null);
    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    
    return (
        <motion.div
        ref={modalRef}
        viewport={{ once: true }}
        initial={{opacity:0, y:60}}
        exit={{opacity:0,
        transition: {
          type: "spring",
          stiffness:160,
          damping:30,
          duration:.2
        }}}
        whileInView={{y:0, opacity:1}}
        transition={{
          type: "spring",
          stiffness:160,
          damping:30,
          duration:.2
        }}
        className={styles['calender-content-container']}>
            <div className={styles['iframe-cover']}>

            </div>
            {
      
          <iframe 
            className={styles["calender"]}
            title="calendly"
            src="https://calendly.com/blackprint-unlimited/30min"
            width="100%"
            height="100%"
            
            frameBorder="0"

    ></iframe>}
        </motion.div>
    );
}

export default Calender;
