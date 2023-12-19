import React, {useState, useEffect, useRef} from 'react';
import styles from '../../styles/Packages.module.scss'
import Button from './Button';
import {motion, AnimatePresence, useScroll, useAnimation} from 'framer-motion'

const PackageV2 = ({type, value, plan, onHandleBooking}) => {
    const env = process.env.REACT_APP_ENV
    const handlePayment = (type) => {
        if (env === "production") {
            if (type==="startup") {
                window.location.href = `https://book.stripe.com/cN25kR2FP9MubIscMM`
            }
            else if (type==="standard") {
                window.location.href = `https://buy.stripe.com/7sI8x3fsB2k27scbIK`
            } else {
                window.location.href= `https://buy.stripe.com/dR6cNj1BL6AieUE6ou`
            }
        } else {
            if (type==="startup") {
                window.location.href = `https://book.stripe.com/test_6oE8wC0Jn03E8dW8wy`
            }
            else if (type==="standard") {
                window.location.href= `https://buy.stripe.com/test_5kA28efEh7w651K144`
            } else {
                window.location.href = `https://buy.stripe.com/test_dR6cMS3Vz03EgKs6ou`
            }
        }
    }
    return (
        <div className={styles['package-wrapper-v2']}>
            <motion.div 
            viewport={{ once: true }}
            initial={{opacity:0, y:64}}
            exit={{opacity:0,
                transition: {
                    type: "spring",
                    stiffness:160,
                    damping:30,
                    duration:.4
                }
            }}
            whileInView={{y:0, opacity:1}}
            transition={{
                type: "spring",
                stiffness:160,
                damping:30,
                duration:.25
            }}
            className={styles['package-container-v2']}>
                <div className={styles['package-header-container-v2']}>
                    <div style={{display:"flex"}}>
                    {(type==="standard")?
                        <div className={styles['package-standard-icon-v2']}/>:(type==="pro")?
                        <div className={styles['package-pro-icon-v2']}/>:null
                    }
                        <p className={styles['package-header-v2']}
                        style={{textShadow: (type==="startup")?
                            "-5px 1px 23px rgba(255, 255, 255, 0.70)":"none",
                            paddingRight:(type==="standard")?"1.75rem":"0rem"
                        }}>
                            {(type==="startup")?'brand start-up':type}
                        </p>
                        {(type==="pro")?
                        <div className={styles['package-pro-icon-alt-v2']}/>:
                        (type==="startup")?
                        <div className={styles['package-startup-label-v2']}>
                            <div className={styles['package-startup-label-text-v2']}>
                                most popular!
                            </div>
                        </div>:null
                        }
                    </div>
                    <p className={styles['package-listing-header-v2']}>
                        {`$${value}${plan==='once'?' once':'/'+plan}`}
                    </p>
                </div>

                <div className={styles['package-listing-wrapper-v2']}>
                
                    <ul className={styles['package-listing-container']} >
                        <li className={styles['package-listing-item-v2']}>
                            {(type==="startup")?'Branding call':
                            `${type==='pro'?'Two requests':'One request'} at a time`
                            }
                        </li>
                        <li className={styles['package-listing-item-v2']}>
                            {
                            `Unlimited design via catalog`
                            }
                        </li>
                        <li className={styles['package-listing-item-v2']}>
                            {
                            `Unlimited Stock photos`
                            }
                        </li>
                        <li className={styles['package-listing-item-v2']}>
                            {
                            `Targeted niche research`
                            }
                        </li>
                        <li className={styles['package-listing-item-v2']}>
                            {
                            `Website Maintenance`
                            }
                        </li>
                        <li className={styles['package-listing-item-v2']}
                        style={{fontWeight:700}}>
                            {(type==="startup")?'Guaranteed ready brand':
                            `Cancel any time`
                            }
                        </li>
                        <li className={styles['package-listing-item-v2']}
                        style={{fontWeight:700}}>
                            {
                            `Average 48 hour delivery`
                            }
                        </li>
                    </ul>
                </div>
            </motion.div>
            <div className={styles['package-button-container']}>
                <Button type="booking" 
                 onHandlePayment={()=>handlePayment(type)}
                 onHandleBooking={()=>onHandleBooking()}/>
                <Button type="package"
                 onHandlePayment={()=>handlePayment(type)}
                 onHandleBooking={()=>onHandleBooking()}/>
            </div>
        </div>
    );
}

export default PackageV2;
