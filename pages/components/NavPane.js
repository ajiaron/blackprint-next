import React, {useState, useEffect} from 'react';
import '../../styles/Navbar.module.scss'
import {Link, useNavigate} from 'react-router-dom'
import { FaBars } from "react-icons/fa";
import {motion, AnimatePresence, useScroll, useAnimation, inView} from 'framer-motion'

const NavPane = ({authenticated, screenWidth, inView, bottomInView, isActive, firstRender, onHandleScroll, onHandleLogin}) => {
    function handleNavigate(id) {
        onHandleScroll(id)
    }
    function handleStripeLogin() {
        window.location.href = `https://billing.stripe.com/p/login/4gw5mD0xQ6ZFczm7ss`
    }

    return (
        <>
        {
        <motion.div
        initial={{opacity:0, x:"100%"}}
        animate={{opacity:1, x:"0%"}}
        exit={{ x:"100%",
        transition:{
            type: "spring",
            stiffness:160,
            damping:30,
            duration:.1
        }}}
        transition={{
          type: "spring",
          stiffness:160,
          damping:30,
          duration:.1
        }}
         className={`navigation-pane-container`}>
            <div className='navigation-pane-content-container'>
                    <span style={{pointerEvents:(isActive)?"auto":"none"}}
                    className={`navbar-item-container`} onClick={()=>handleNavigate("catalog")}>
                        Recent Work
                    </span>
                    <span style={{pointerEvents:(isActive)?"auto":"none"}}
                    className={`navbar-item-container`} onClick={()=>handleNavigate("products")}>
                        Catalog
                    </span>
                    <span style={{pointerEvents:(isActive)?"auto":"none"}}
                    className={`navbar-item-container `} onClick={()=>handleNavigate("faqs")}>
                        FAQ's
                    </span>
                    <span style={{pointerEvents:(isActive)?"auto":"none"}}
                    className={`navbar-item-container`} onClick={()=>handleNavigate("packages")}>
                        Pricing
                    </span>

                    {/* 
                    <span style={{pointerEvents:(isActive)?"auto":"none"}}
                    className={`navbar-item-container-alt`} onClick={()=>(authenticated)?handleSignOut():onHandleLogin()}>
                       {authenticated?'Logout':'Login'}
                    </span>
                    */}
                    <span style={{pointerEvents:(isActive)?"auto":"none"}}
                    className={`navbar-item-container`} onClick={()=>handleStripeLogin()}>
                       Login
                    </span>
     

            </div>
        </motion.div>

        }
        </>
    );
}

export default NavPane;
