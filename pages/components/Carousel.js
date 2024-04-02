import React, {useState, useEffect, useRef} from 'react';
import { animate, motion, useAnimation, useMotionValue } from 'framer-motion';
import styles from '../../styles/Carousel.module.scss'
import useMeasure from 'react-use-measure';

const RenderIcon = ({icon, key}) => {
    return (
        
        <div className={[styles['carousel-icon-container'], styles[`${icon}-icon`]].join(' ')} >
            {(icon === 'noservice')&&"NO SERVICE*"}
        </div>
    )
}

const Carousel = ({screenWidth}) => {
    const controls = useAnimation();
    const iconsRef = useRef(null)
    const icons = [
        'circleoc',
        'nebula',
        'dashbill',
        'ksig',
        'peaking-duck',
        'legacy',
        'noservice'
    ]
    let [ref, { width }] = useMeasure();
    const xTranslation = useMotionValue(0)
    useEffect(()=> {
        let control;
        let finalPosition =(screenWidth<=480)? -966 - 32:'-50%'
        control = animate(xTranslation, [0, finalPosition], {
            ease:"linear",
            duration: (screenWidth>480)?20:15,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay:0,
        })
        console.log(screenWidth)
        return control.stop  
    }, [xTranslation, screenWidth])
  /*  useEffect(() => {
        const loopAnimation = async () => {
            // animate to half the width to show the second set
            await controls.start({ x: (screenWidth>480)?'-50%':'-75%', transition: { duration: 5, ease: "linear" } });
            // instantly resets to the start
            controls.set({ x: '0%' });
            loopAnimation();
        };
     //   if (screenWidth>480) {
            loopAnimation()
       // }
    }, [controls]);
*/

    return (
        <div className={styles['carousel-container']}>

            <motion.div 
            ref={ref}
            initial={{ x: 0 }}
            style={{x: xTranslation}}
            className={styles['carousel-content-container']}>
                {[...icons, ...icons].map((item, idx) => (
                    <RenderIcon icon={item} key={idx}/>
                ))}
            </motion.div>
            
        </div>
    );
}

export default Carousel;
