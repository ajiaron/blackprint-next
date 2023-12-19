import React, {useState, useEffect, useRef} from 'react';
import Typewriter from 'typewriter-effect'
import styles from '../../styles/Faqs.module.scss'
import {motion, AnimatePresence, useScroll, useAnimation} from 'framer-motion'
const Faqs = ({topic, info, index, screenWidth, onHandleClose, onHandleOpen}) => {
    const [isOpen, setIsOpen] = useState(false)
    function handleOpen() {
        setIsOpen(!isOpen)
    }
    useEffect(()=> {
        if (isOpen) {
            onHandleOpen(
                (index===1)?104:
                (index===2)?104.01:
                (index===3)?70:
                (index===4)?69.09:134)
        } else {
            onHandleClose(
                (index===1)?104:
                (index===2)?104.01:
                (index===3)?70:
                (index===4)?69.09:134)
        }
    }, [isOpen])
    return (
        <span className={styles[`faqs-content-item`]}
        onClick={()=>handleOpen()}>
            <div style={{display:"flex", width:"100%", alignItems:"center", paddingTop:(screenWidth>480)?"2.125rem":(index===1)?"1.5rem":"2.125rem"}}>
                <p className={styles['faqs-content-item-text']}>
                    {topic}
                </p>
                {(screenWidth>480)&&
                <span style={{
                    marginLeft:"auto", paddingTop:"0rem", height:"100%", display:"flex", alignItems:"center"}}>
                    <svg className={styles['faqs-dropdown-icon']}
                    xmlns="http://www.w3.org/2000/svg" width="28" height="21" viewBox="0 0 28 21" fill="none">
                        <path d="M1 1L14.6341 20L27 1" stroke="white"/>
                    </svg>
                </span>  
                } 
            </div>
            <AnimatePresence>
                {(isOpen)&&
                 <motion.span
                 style={{width:"100%"}}
                 initial={{height:0}}
                 animate={{height:(isOpen)?(index===1||index===2)?124:
                    (index===3||index===4)?90:154:0}}
                 exit={{
                    height:0,
                    transition:{
                        type: "spring",
                        stiffness:160,
                        damping:30,
                        duration:.1
                      }
                 }}
                 transition={{
                   type: "spring",
                   stiffness:160,
                   damping:30,
                   duration:.1
                 }}>
                    <motion.div style={{display:"flex", minWidth:"100%", alignItems:"center", height:"90%", paddingLeft:"0rem"}}
                     initial={{opacity:0}}
                        animate={{opacity:1}}
                        transition={{
                            type: "spring",
                            stiffness:160,
                            damping:30,
                            duration:.1
                        }}
                        exit={{
                            opacity:0,
                            transition:{
                                type: "spring",
                                stiffness:160,
                                damping:30,
                                duration:.1
                            }
                        }}>
                        <motion.p className={styles['faqs-content-text']}
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        transition={{
                            type: "spring",
                            stiffness:160,
                            damping:30,
                            duration:.1
                        }}
                        exit={{
                                opacity:0,
                                transition:{
                                    type: "spring",
                                    stiffness:160,
                                    damping:30,
                                    duration:.1
                                }
                            }}>
                        {info}
                        </motion.p>
                    </motion.div>
                </motion.span>
                }
            </AnimatePresence>
        </span>
    );
}

export default Faqs;
