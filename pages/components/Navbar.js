import React, {useState, useEffect} from 'react';
import styles from '../../styles/Navbar.module.scss'
import {Link, useNavigate} from 'react-router-dom'
import { Auth } from 'aws-amplify';
import { FaBars } from "react-icons/fa";
import {motion, AnimatePresence, useScroll, useAnimation, inView} from 'framer-motion'

const Navbar = ({authenticated, screenWidth, inView, bottomInView, isActive, firstRender, onHandleScroll, onHandleLogin, onHandlePane}) => {
    function handleNavigate(id) {
        onHandleScroll(id)
    }
    function handleStripeLogin() {
        window.location.href = `https://billing.stripe.com/p/login/4gw5mD0xQ6ZFczm7ss`
    }
    async function handleSignOut() {
        try {
            await Auth.signOut();
            window.location.reload(false);
          } catch (error) {
            console.log('error signing out: ', error);
          }
    }
    return (
        <>
        {(screenWidth>480)?
        <motion.div
        initial={{opacity:0, y:10}}
        animate={(bottomInView)?{y:116, opacity:0}:{opacity:1, y:(inView)?0:54}}
        transition={{
          type: "spring",
          stiffness:150,
          damping:30,
          duration:.15
        }}
         className={styles[`navbar-container${!isActive?(!firstRender)?'inactive-landing-container':'dim-landing-container':(!firstRender)?'active-container':''}`]}>
            <div className={styles['navbar-content-container']}>
                <span style={{pointerEvents:(isActive)?"auto":"none"}}
                className={styles['navbar-icon-container']} onClick={()=>handleNavigate("landing")}>
                    <div className={styles['navbar-icon']}/>
                </span>
                <div className={styles['navbar-text-content']}>
                    <span style={{pointerEvents:(isActive)?"auto":"none"}}
                    className={styles[`navbar-item-container`]} onClick={()=>handleNavigate("catalog")}>
                        Recent Work
                    </span>
                    <span style={{pointerEvents:(isActive)?"auto":"none"}}
                    className={styles[`navbar-item-container`]} onClick={()=>handleNavigate("products")}>
                        Catalog
                    </span>
                    <span style={{pointerEvents:(isActive)?"auto":"none"}}
                    className={styles[`navbar-item-container`]} onClick={()=>handleNavigate("packages")}>
                        Pricing
                    </span>
                    <span style={{pointerEvents:(isActive)?"auto":"none"}}
                    className={styles[`navbar-item-container`]} onClick={()=>handleNavigate("faqs")}>
                        FAQ's
                    </span>
                    {/* 
                    <span style={{pointerEvents:(isActive)?"auto":"none"}}
                    className={`navbar-item-container-alt`} onClick={()=>(authenticated)?handleSignOut():onHandleLogin()}>
                       {authenticated?'Logout':'Login'}
                    </span>
                    */}
                    <span style={{pointerEvents:(isActive)?"auto":"none"}}
                    className={styles[`navbar-item-container-alt`]} onClick={()=>handleStripeLogin()}>
                       Login
                    </span>
     
                </div>
            </div>
        </motion.div>
        :
        <motion.span className={styles['navbar-small-icon-wrapper']} onClick={()=>onHandlePane()}>
            <FaBars className={styles['navbar-small-icon']}/>
        </motion.span>
        }
        </>
    );
}

export default Navbar;
