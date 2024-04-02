import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/V2.module.scss'
//import style from '../styles/App.module.scss'
import faqsStyles from '../styles/Faqs.module.scss'
import packStyles from '../styles/Packages.module.scss'
import prodStyles from '../styles/Products.module.scss'
import propStyles from '../styles/Proposition.module.scss'
import React, {useState, useEffect, useRef} from 'react'
import Navbar from './components/Navbar';
import Catalog from './components/Catalog';
import Calender from './components/Calender';
import PackageV2 from './components/PackageV2';
import Products from './components/Products';
import Typewriter from 'typewriter-effect'
import Carousel from './components/Carousel';
import {motion, AnimatePresence, useScroll,useMotionValueEvent, useAnimation, inView} from 'framer-motion'
import Faqs from './components/Faqs';
import NavPane from './components/NavPane';
import Loading from './components/Loading'
import { useInView } from 'react-intersection-observer';
import Lottie, {useLottie} from 'lottie-react';
import { Analytics } from '@vercel/analytics/react';
import lightningLottie from './components/data/lightningLottie.json';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = "#42cc00";
    ctx.lineWidth = 2;


    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.closePath();
    setIsDrawing(false);
  };

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      style={{ border: 'none', position:"absolute", zIndex:998}}
    />
  );
};

export default function Home() {
  const scrollRef = useRef(null)
  const env = process.env.REACT_APP_ENV
  const [screenWidth, setScreenWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      // Client-side, window is available
      return window.innerWidth;
    } else {
      return 1024; 
    }
  });
  const [loading, setLoading] = useState(true)
  const [screenHeight, setScreenHeight] = useState(0);
  const [signInActive, setSignInActive] = useState(null)
  const [firstRender, setFirstRender] = useState(true)
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [calenderActive, setCalenderActive] = useState(false)
  const [isActive, setIsActive] = useState(true) // background is active
  const [scrollY, setScrollY] = useState(0);
  const [openPane, setOpenPane] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [openCount, setOpenCount] = useState([])
  //const {scrollY} = useScroll()
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lightningLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const {View} = useLottie(defaultOptions)

  function handleOpen(val) {
    setOpenCount((openCount)=>openCount>=0?openCount+val:0)
  }
  const handleSignIn = (type) => {
    setFirstRender(false)
    setSignInActive(type)
    setIsActive(false)
  }
  const handleBooking = () => {
    setFirstRender(false)
    setCalenderActive(true)
    setIsActive(false)
  }
  const handleBlur = () => {
    setIsActive(true)
  }
  const closeSignIn = () => {
    setSignInActive(null)
  }
  const closeCalender = () => {
    setCalenderActive(false)
    setIsActive(true)
  }

  function handleTest() {
    console.log(signInActive)
  }
  
  const { ref:topRef, inView: topInView} = useInView({
    threshold:0.5,
    triggerOnce:false
  });
  const { ref:bottomRef, inView: bottomInView} = useInView({
    threshold:0.5,
    triggerOnce:false
  });
  useEffect(()=>{
    if (topInView) {
      console.log("in view")
    } else {
      console.log("not in view")
    }
  }, [topInView])


  // open navigation pane for mobile
  const handlePane = () => {
    setOpenPane(!openPane)
  }

  // payment link for "buy now" on footer 
  const handlePayment = () => {
    if (env === "production") {
      window.location.href = `https://buy.stripe.com/14k6oV2FP1fYdQAeUX`

    } else {
      window.location.href= `https://buy.stripe.com/test_28oeV09fTaIi51KcMP`
    }
  }
  // booking link for calandly
  function navigateBooking() {
    window.location.href = `https://calendly.com/blackprint-unlimited/30min`
  }
  function handleStripeLogin() {
    if (env === "development") {
      window.location.href = `https://billing.stripe.com/p/login/test_aEUeVfcre4OI8zC4gg`
    } else {
      window.location.href = `https://billing.stripe.com/p/login/4gw5mD0xQ6ZFczm7ss`
    }
   
  }
  function handleNavigate(val) {
    if (val === "terms") {
      window.location.href = `https://www.termsfeed.com/live/208e984c-90de-4a80-aef5-bca1c2f10e30`
    } else {
      window.location.href = `https://www.termsfeed.com/live/68f663b0-f207-4758-8a8a-e46da2cd3e60`
    }
  }
  // get position of each section
  function getYPositionById(id) {
    let element = document.getElementById(id);
    let yPosition = 0;
    while (element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return yPosition
  }

  // navbar jump points
  const handleButtonClick = (id) => {
      console.log(getYPositionById(`${id}`))
      const element = document.getElementById('main')
      if (id === "packages") {
        element.scrollTo({top:getYPositionById(id) - window.innerHeight / 4.45, behavior:'smooth'})  
      } else if (id === "faqs") {
        element.scrollTo({top:getYPositionById(id) - window.innerHeight / 10, behavior:'smooth'})  
      } else if (id==="proposition") {
        element.scrollTo({top:getYPositionById(id) - window.innerHeight/15, behavior:'smooth'})  
      } else if (id==="products") {
        element.scrollTo({top:getYPositionById(id) - window.innerHeight/8.5, behavior:'smooth'})  
      } else if (id==="catalog") {
        element.scrollTo({top:getYPositionById(id) - window.innerHeight/4, behavior:'smooth'})  
      } else {
        element.scrollTo({top:getYPositionById(id), behavior:"smooth"}) 
      }
  };

  useEffect(()=> {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); // Adjust the time as needed, here it's set for 5 seconds
   
    return () => clearTimeout(timer);
  }, [])

  // unused, does nothing but detect scroll
  

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setScrollY(scrollRef.current.scrollTop)
      }
    };
    const div = scrollRef.current;
    div.addEventListener('scroll', handleScroll);
    return () => div.removeEventListener('scroll', handleScroll);
  }, []);




  // utility for responsiveness
  useEffect(() => {
    // Set the initial values
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);

    // Optionally, you might want to handle window resize events
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures this runs once on mount


  // tab effect
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = 'wya...';
      } else {
        document.title = 'BLACKPRINT';
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
    function gtag() {
    dataLayer.push(arguments)
    }
  return (
    <>
      <Head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5NKX30F5Z3"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5NKX30F5Z3');
            `,
          }}
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6642071577759299"
     crossorigin="anonymous"></script>
         {/* Schema.org metadata */}
         <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "WebPage",
            "name": "BLACKPRINT",
            "description": "Welcome to Blackprint! We are a creative design agency aiming to provide outstanding visuals for websites, mobile apps, and any other projects you may have. We thank you for your support and visting us!",
            "url": "https://www.blackprint.in/"
          }) }}
        />
        
        <title>BLACKPRINT</title>
        <meta charset="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta itemprop="name" content="blackprint"></meta>
        <meta itemprop="description" content="Welcome to Blackprint! We are a creative design agency aiming to provide outstanding visuals for websites, mobile apps, and any other projects you may have. We thank you for your support and visting us!">
        </meta>
        <meta itemprop="url" content="https://www.blackprint.in/"></meta>
        <link rel="icon" href="/assets/logo.png" />
        
      </Head>
      <Analytics/>
      {(loading)&&
        <Loading/>
      }


      <main className={styles['main-content-v2']} id="main" ref={scrollRef}>
      { (screenWidth>480 && !loading)&&
      <Navbar authenticated={isAuthenticated} screenWidth={screenWidth} inView={topInView} bottomInView={bottomInView} isActive={isActive} firstRender={firstRender} onHandleScroll={(id)=>handleButtonClick(id)} onHandleLogin={()=>handleSignIn("login")} onHandlePane={()=>handlePane()}/>
      }

      {/*
        (signInActive!==null)&&<Signin type={signInActive} onClose={closeSignIn} onBlur={handleBlur}/>
    */}
      { 
        <AnimatePresence>
          {(calenderActive)&&
            <Calender 
              onClose={closeCalender}
            />
          }
        </AnimatePresence>
      }
      <div className={`main-content-container ${!isActive?(!firstRender)?'inactive-landing-container':'dim-landing-container':(!firstRender)?'active-container':''}`}>

        <section className={styles["landing-content"]} id={"landing"}>
          {// for drawing
          /*
         <div style={{position:"relative"}}>
         <DrawingCanvas/>
         </div>*/
          }

       
          <div style={{marginRight:"auto", marginLeft:"auto", position:"relative"}}>
            <div className={styles["hero-wrapper-v2"]}/>
          </div>
            <div className={styles["header-text-container-v2"]} ref={topRef}>
              <div style={{position:"relative"}}>
                <span className={styles["header-icon-v2"]}/>
              </div>
              <div className={styles["header-text-wrapper"]} style={{display:"flex", gap:`${(screenWidth<480)?".25rem":".5rem"}`, marginLeft:"auto", marginRight:"auto"}}>
                <p className={styles["header-text-alt"]}>
                  BLACK
                </p>
                <p className={styles["header-text-symbol"]}
                style={{fontSize:"clamp(6px, 4vw, 16px)"}}>
                  •
                </p>
                <p className={styles["header-text"]}>
                  PRINT
                </p>
                <span className={styles["header-text-icon"]} />

              </div>
              { (screenWidth<=480)&&
               <Navbar authenticated={isAuthenticated} screenWidth={screenWidth} inView={topInView} bottomInView={bottomInView} isActive={isActive} firstRender={firstRender} onHandleScroll={(id)=>handleButtonClick(id)} onHandleLogin={()=>handleSignIn("login")} onHandlePane={()=>handlePane()}/>
              }
            </div>
    
          {
            (screenWidth<=480)&&
            <AnimatePresence>
              {(openPane)&&
              <NavPane authenticated={isAuthenticated} screenWidth={screenWidth} inView={topInView} bottomInView={bottomInView} isActive={isActive} firstRender={firstRender} onHandleScroll={(id)=>handleButtonClick(id)} onHandleLogin={()=>handleSignIn("login")} onHandlePane={()=>handlePane()}/>
              }
            </AnimatePresence>
            
          }
          <div className={styles["main-content-hero-v2"]}>
            {(screenWidth<=480)?
              <p className={styles["hero-text-v2"]}>
              “if a blueprint is the&nbsp;&nbsp;&nbsp; foundation, the
              </p>:
              <p className={styles["hero-text-v2"]}>
              “if a blueprint is the foundation, the
              </p>
            }
            <div style={{position:"relative"}}>
              <div className={styles["hero-subtext-container-v2"]}>
                <p className={styles["hero-subtext-v2"]}>
                &nbsp;NEW CONCEPT 001</p>
                <Typewriter
                options={{
                  strings: ['"TRANSFORMATION"'],
                  autoStart: true,
                  loop: true,
                  deleteSpeed:50,
                  delay: 50,
                  pauseFor: 3000,
                  wrapperClassName:styles["typewriter-v2"]
                }}
                >
                </Typewriter>
              </div>
          </div>
          <div className={styles['blackprint-hero-wrapper']} style={{display:"flex", marginLeft:"auto", marginRight:"auto", justifyContent:"center"}}>
              <div className={styles['hero-text-alt-v2-container']}>
                  <p className={styles['hero-text-alt-v2']}>
                      BLACK
                  </p>
              
                  <p className={[styles[`hero-text-alt-v2`],styles[(screenWidth<480)?"hero-text-alt-symbol":""]].join(' ')}
                  style={{fontSize:"clamp(6px, 4vw, 50px)", border:"none", alignSelf:"center", transform:"translateY(0rem)",lineHeight:"normal"}}>
                  •
                  </p>
                  <p className={styles['hero-text-alt-v2']}>
                  PRINT
                  </p>
              
              </div>
              <p className={styles['hero-text-v2']} style={{display:"inline", fontSize:"4rem"}}>
                  &nbsp;
              </p>
              <p className={styles['hero-text-v2']} style={{display:"inline", 
              transform:`translateY(${(screenWidth<=480)?".325rem":"0"}) translateX(${(screenWidth<=480)?"-.5rem":"0"})`}}>
                  IS
              </p>
          </div>
        
          <div className={styles["hero-text-v2"]} style={{display:"inline",fontSize:"2em" }}>
          &nbsp;
          </div>
          <p className={styles["hero-text-v2"]} style={{display:"inline"}}>
          everything else”
          </p>
        </div>
          <div className={styles["header-subtext-container-v2"]}>
              UNLIMITED BRANDING, MARKETING, AND DESIGN NEEDS.
          </div>

      </section>

      <Carousel screenWidth={screenWidth}/>
      <Catalog scrollY={scrollY} screenWidth={screenWidth}/>

      { // vector seperator
      (screenWidth>480)&&
      <div className={styles["hero-vector-container-v2"]}>
        <div className={styles["hero-vector-top-v2"]}/>
        
      </div>
      }
      <section className={styles["proposition-content"]} id={"proposition"}>
        <div className={propStyles["proposition-header"]}>
          <div className={styles["proposition-header-container-v2"]}>
            <p className={styles["proposition-header-text-v2"]}  style={{display:"inline", fontWeight:"400"}}>
              TURN YOUR IDEAS TO&nbsp;
            </p>
            <p className={styles["proposition-header-text-v2"]} style={{display:"inline", fontWeight:"700"}}>
              REALITY
            </p>
          </div>

          <p className={styles["proposition-header-subtext-v2"]}>
            Designs catered to your vision that you can trust.
            </p>
        
        </div>
        <div className={styles["proposition-content-container-v2"]}>
          <div className={styles["proposition-value-text-container-v2"]}>
            <div className={propStyles["proposition-value-text-wrapper"]} style={{transform:(screenWidth>480)?"translateX(-.75rem)":"translateX(0)"}}>
        
              <span className={styles["lightning-container"]}
                  onMouseEnter={() => setHovered("lightning")}
                  onMouseLeave={() => setHovered(null)}>
                    {/*
                      <Lottie {...defaultOptions} height={400} width={400} className="proposition-value-icon"/>
                                  <motion.div className="proposition-value-icon lightning-icon"/>     
                     */}
                
                  <div className={[styles["proposition-value-icon-v3"],styles["lightning-icon-v2"]].join(' ')}>
                  
                    {View}
               
                  </div>

                  <motion.div 
                    initial={{x:-4.4, y:-8.8, rotate:0}}
                  // viewport={{once:true}}
              //     whileHover={{x:-4.4, y:-8.8, rotate:180}}
                    whileInView={{x:-4.4, y:-8.8, rotate:180}}
                    animate={{x:-4.4, y:-8.8, rotate:(hovered==="lightning")?180:0}}
                    transition={{
                      type: "spring",
                      stiffness:100,
                      damping:20,
                      duration:.5,
                      repeat:Infinity,
                      delay:.5,
                      repeatType:"loop",
                      repeatDelay:1.25
                    }}
                    className={[,styles["lightning-star-icon"]].join(' ')}/>

                  
                </span>
                <div className={propStyles["proposition-value-text"]}>
                  lighting fast delivery
                </div>
                <div style={{maxWidth:"22.75rem"}}>
                  <p className={propStyles["proposition-value-subtext"]}>
                    we'll always update you<br/> on our progress.&nbsp;
                  </p>
                  <p className={propStyles["proposition-value-subtext"]} style={{display:"inline", fontWeight:"700"}}>
                    full transparency.
                  </p>
                </div>
              </div>
              <div className={propStyles["proposition-value-text-wrapper"]} style={{transform:(screenWidth>480)?"translateX(.25rem)":"translateX(0)"}}>
              
                <motion.span className={styles["arrow-loop-container"]}
              
                  >
                  <motion.div 
                    initial={{x:37.5, rotate:0}}
                    viewport={{once:true}}
                    whileInView={{x:19.5, rotate:0}}
                    transition={{
                      type: "spring",
                      stiffness:150,
                      damping:30,
                      duration:.5,
                      repeat:Infinity,
                      delay:.5,
                      repeatType:"reverse",
                      repeatDelay:1.25
                    }}
                    className={[propStyles["proposition-value-icon"],styles["top-arrow-v2"]].join(' ')}
                  />
                  <motion.div 
                    initial={{x:-37.5, rotate:180}}
                    viewport={{once:true}}
                    whileInView={{x:-19.5,rotate:180}}
                    transition={{
                      type: "spring",
                      stiffness:150,
                      damping:30,
                      duration:.5,
                      delay:.5,
                      repeat:Infinity,
                      repeatType:"reverse",
                      repeatDelay:1.25
                    }}
                    className={[propStyles["proposition-value-icon"], styles["bottom-arrow-v2"]].join(' ')}
                    />
                </motion.span>
                <div className={propStyles["proposition-value-text"]} style={{transform:"translateX(0rem)"}}>
                revise to satisfaction
                </div>
                <div style={(screenWidth>480)?{maxWidth:"22.75rem",transform:"translateX(.125rem)"}:{}}>
                  <p className={propStyles["proposition-value-subtext"]} style={{display:"inline"}}>
                  we'll revise until you're<br/>
                  </p>
                  <p className={propStyles["proposition-value-subtext"]} style={{display:"inline", fontWeight:"700"}}>
                  100%
                  </p>
                  <p className={propStyles["proposition-value-subtext"]}>
                  &nbsp;satisfied with the <br/>design.
                  </p>
                </div>
              </div>
              <div className={propStyles["proposition-value-text-wrapper"]} style={{transform:(screenWidth>480)?"translateX(1.25rem)":"translateX(0)"}}>
                <span className={styles["dap-container"]}>
                  <motion.div 
                    initial={{ x:20, rotate:0}}
                    //viewport={{once:true}}
                    whileInView={{x:20, rotate:10}}
                    transition={{
                      type: "spring",
                      stiffness:160,
                      damping:40,
                      duration:.5,
                      repeat:Infinity,
                      delay:.5,
                      repeatType:"reverse",
                      repeatDelay:1
                    }}
                    className={[propStyles["proposition-value-icon"],styles["lefthand"]].join(' ')}/>
                  <motion.div 
                    initial={{x:-20,rotate:0}}
                  // viewport={{once:true}}
                    whileInView={{x:-20,rotate:-10}}
                    transition={{
                      type: "spring",
                      stiffness:160,
                      damping:40,
                      duration:.5,
                      delay:.5,
                      repeat:Infinity,
                      repeatType:"reverse",
                      repeatDelay:1
                    }}
                  className={[propStyles["proposition-value-icon"],styles["righthand"]].join(' ')}/>
                </span>


                
                <div className={propStyles["proposition-value-text"]}>
                  catered to <br/>your needs
                </div>
                <div style={{maxWidth:"22.75rem"}}>
                  <p className={propStyles["proposition-value-subtext"]}>
                  we'll replicate any <br/>references, design around <br/>your vision.
                </p>
                <p className={propStyles["proposition-value-subtext"]} style={{display:"inline", fontWeight:"700",}}>

                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles['products-content']} id="products">
        <div className={prodStyles['products-content-container']}>
          <div className={prodStyles['products-header-container']}>
            {(screenWidth>480)&&
            <div className={styles['green-star-container']}>
              <div className={styles['green-star-lower']}/>
              <div className={styles['green-star-upper']}/>
            </div>
          }
            {(screenWidth>480)?
            <>
            <p className={[styles["proposition-header-text-v2"], prodStyles["product-header"]].join(' ')} style={{display:"inline", fontWeight:"400"}}>
              LOGOS, FLYERS, WEBSITES {'&'}&nbsp;
            </p>
            <p className={[styles["proposition-header-text-v2"], prodStyles["product-header"]].join(' ')} style={{display:"inline", fontWeight:"700"}}>
              MORE
            </p>
            </>
            :
            <>
            <p className={[styles["proposition-header-text-v2"], prodStyles["product-header"]].join(' ')}  style={{display:"inline", fontWeight:"400", paddingLeft:".25rem"}}>
              LOGOS, FLYERS,
            </p>
            <div style={{display:"flex"}}>
            <p className={[styles["proposition-header-text-v2"], prodStyles["product-header"]].join(' ')} style={{display:"inline", fontWeight:"400", whiteSpace:"nowrap"}}>
              WEBSITES {'&'}&nbsp;
            </p>
            <p className={[styles["proposition-header-text-v2"], prodStyles["product-header"]].join(' ')} style={{display:"inline", fontWeight:"700", transform:"translateY(-.075rem)"}}>
               MORE
            </p>
            </div>
           
            </>
            }
          </div>

          <Products/>
          {(screenWidth>480)&&
          <div className={prodStyles['footer-star-container']}>
              <div className={styles['green-star-lower']}/>
              <div className={styles['green-star-upper']}/>
          </div>
          }

        </div>
      </section>

      { // vector seperator
      (screenWidth>480)&&
      <div className={propStyles["proposition-vector-container"]}>
        <p className={propStyles["proposition-vector-text"]}>
        "package options"
        </p>
        <div className={propStyles["proposition-vector-footer"]}/>
      </div>
      }
      
      <section className={styles["package-content"]} id={"packages"}>
        <div className={styles["proposition-header-container-v2"]}>
          <p className={styles['proposition-header-text-v2']} style={{display:"inline"}}>
            SO{''}...{' '}WHAT DO WE&nbsp;
          </p>
          <p className={styles["proposition-header-text-v2"]} style={{display:"inline", fontWeight:"700"}}>
              OFFER?
          </p>

        </div>
        <motion.div className={packStyles["package-content-container"]}>
          <PackageV2 type={'standard'} value={600} plan={'month'} onHandleBooking={()=>navigateBooking()}/>
          <PackageV2 type={'pro'} value={700} plan={'month'} onHandleBooking={()=>navigateBooking()}/>
          <PackageV2 type={'startup'} value={800} plan={'once'} onHandleBooking={()=>navigateBooking()}/>
        </motion.div>
      </section>

      <motion.section 
       initial={{height:565}}
       animate={{height:565+(openCount.reduce((partialSum, a) => partialSum + a, 0))}}
       transition={{
        type: "spring",
        stiffness:160,  
        damping:30,
        duration:.15
      }}
        className={styles['faqs-content']} id="faqs">
        <motion.div className={faqsStyles['faqs-content-container']}
        initial={{opacity:0, y:50}}
        viewport={{once:true}}
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
        }}>
          <div className={faqsStyles['faqs-header-text']}>
          faqs
          </div>
          <ul className={faqsStyles['faqs-content-list']}>
            <Faqs topic={"why blackprint?"} index={0} info={
              `Less stress, work done faster, transform your ideas into reality.\n`+
              `With 3 workers under your belt, we are versed in Video Editing,\n`+
              `Web Development, Graphic Design, User Experience, and much more!`}
              screenWidth={screenWidth}
              onHandleClose={(val)=>setOpenCount(openCount.filter((item)=>item!==val))}
              onHandleOpen={(val)=>setOpenCount([...openCount, val])}/>
            <div className={faqsStyles['faqs-item-border']}/>
            <Faqs topic={"can't i just hire a full-time designer?"} index={1}
            info={`The average designer is paid around +$100,000. \n`+
            `Save up to 95.2% of this cost when purchasing the standard plan. \n`+
            `We undercharge and over-provide.`}
            screenWidth={screenWidth}
            onHandleClose={(val)=>setOpenCount(openCount.filter((item)=>item!==val))}
            onHandleOpen={(val)=>setOpenCount([...openCount, val])}/>
            <div className={faqsStyles['faqs-item-border']}/>
            <Faqs topic={"who are the designers?"} index={2}
            info={`3 designers who are passionate about design. We’ve worked with\n`+
            `clothing brands, event companies, developed mobile apps, and more!`}
            screenWidth={screenWidth}
            onHandleClose={(val)=>setOpenCount(openCount.filter((item)=>item!==val))}
            onHandleOpen={(val)=>setOpenCount([...openCount, val])}/>
            <div className={faqsStyles['faqs-item-border']}/>
            <Faqs topic={"are there any refunds?"} index={3} info={`Unfortunately, due to the nature of these projects, refunds are not offered.`}
            screenWidth={screenWidth}
            onHandleClose={(val)=>setOpenCount(openCount.filter((item)=>item!==val))}
            onHandleOpen={(val)=>setOpenCount([...openCount, val])}/>
            <div className={faqsStyles['faqs-item-border']}/>
            <Faqs topic={"What if i dont like the design?"} index={4}
            info={`We’ll continue to revise the design until you’re 100% satisfied!`}
            screenWidth={screenWidth}
            onHandleClose={(val)=>setOpenCount(openCount.filter((item)=>item!==val))}
            onHandleOpen={(val)=>setOpenCount([...openCount, val])}/>
            <div className={faqsStyles['faqs-item-border']}/>
          </ul>
        </motion.div>
      </motion.section>
      {
      <section className={styles['footer-content']}>

        <div style={{display:"flex"}}>
          {(screenWidth>480)&&
            <div className={styles['footer-star-container-v2']}>
                <div className={styles['green-star-lower-alt']}/>
                <div className={styles['green-star-upper-alt']}/>
            </div>
          }
            <div style={{display:"flex", gap:(screenWidth>480)?".65rem":"1.5rem", flexDirection:"column", justifyContent:"center", alignItems:"center"}} 
            className={styles["footer-text-container"]}>
   
              <div style={{display:(screenWidth>480)?"flex":"block"}} className={styles["footer-header-wrapper"]}>
                <div className={styles['footer-content-text']} style={{display:"inline"}}>
                see if blackprint is for you&nbsp;
                </div>
                <div className={styles['footer-content-text']} style={{display:"inline",borderBottom:"1px solid rgba(82, 255, 0, 0.50)"}}>
                today!
                </div>

              </div>
              <p className={styles['footer-content-subtext']} style={{zIndex:"1"}}>
              Take the first step into turning your idea into reality. 
              </p>
            </div>
          {(screenWidth>480)&&
            <div className={styles['footer-star-container-alt-v2']}>
              <div className={styles['green-star-lower-alt']}/>
              <div className={styles['green-star-upper-alt']}/>
            </div>
        }
        </div>
          <span className={styles['footer-booking-button-v2']} onClick={()=>navigateBooking()}>
              <div className={styles['footer-booking-icon']}>
                {(screenWidth>480)&&
                <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 40 40" fill="none">
                  <g filter="url(#filter0_d_326_811)">
                  <path d="M26.2269 26.2268C22.9893 29.4644 17.7838 29.5301 14.6269 26.3731C11.4699 23.2162 11.5356 18.0107 14.7732 14.7731C18.0107 11.5356 23.2162 11.4699 26.3732 14.6268C29.5301 17.7838 29.4644 22.9893 26.2269 26.2268ZM27.6586 27.6586C31.711 23.6061 31.793 17.1101 27.8414 13.1586C23.8899 9.20702 17.3939 9.28895 13.3414 13.3414C9.28896 17.3939 9.20704 23.8899 13.1586 27.8414C17.1101 31.793 23.6061 31.711 27.6586 27.6586ZM19.7659 21.2341L22.6293 24.0976L24.0976 22.6293L21.2342 19.7658L23.4366 17.5634L17.6366 17.6366L17.5634 23.4366L19.7659 21.2341Z" fill="white"/>
                  </g>
                  <defs>
                    <filter id="filter0_d_326_811" x="0.247559" y="0.247559" width="40" height="40" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_326_811"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_326_811" result="shape"/>
                    </filter>
                  </defs>
                </svg>
                }
              </div>
              <div style={{display:"flex"}}>
                <p className={styles['footer-booking-text']}>
                    {`Book a demo |`}&nbsp;
                </p>
                <p className={[styles['footer-booking-text'], styles['queue-number']].join(' ')}>
                    {`10 `}
                </p>
                <p className={styles['footer-booking-text']} style={{ paddingRight: ".875rem"}}>
                    &nbsp;{`spots left`}
                </p>
              </div>
           
          </span>
          {(screenWidth<=480)&&
          <div className={styles['footer-bottom-content']}>
              <div style={{ 
            zIndex:"1",display:"flex",gap:".5rem",marginRight:"auto"}}>
                <p className={styles["footer-logo-text"]} style={{paddingLeft:"0.0em"}}>
                  BLACK
                </p>
                <p className={styles["footer-logo-text"]}
                style={{fontSize:"clamp(12px, 4vw, 18px)", lineHeight:"23px"}}>
                  •
                </p>
                <p className={styles["footer-logo-text"]}>
                  PRINT
                </p>
                <span className={styles["footer-text-icon"]}/>
            </div>
            <div style={{display:"flex", alignSelf:"flex-start", paddingLeft:"0rem", paddingTop:".375rem" }} ref={bottomRef} >
                <p className={styles['timestamp-footer']}>
                  © 2023
                </p>
            </div>

            <div className={styles['footer-links-container']}>
              <div className={styles['footer-links-column']}>

                  <span className={styles['footer-links-text']} onClick={()=>handleButtonClick("catalog")}>
                    Recent Work
                  </span>
                  <span className={styles['footer-links-text']} onClick={()=>handleButtonClick("packages")}>
                    Pricing
                  </span>
                  <span className={styles['footer-links-text']} onClick={()=>handleButtonClick("faqs")}>
                    FAQ
                  </span>
       
              </div>
              <div className={styles['footer-links-column']}>
              <span className={styles['footer-links-text']} onClick={()=>handleStripeLogin()}>
                    Client Login
                  </span>
                <span className={styles['footer-links-text']} onClick={()=>handleNavigate("terms")}>
                    Terms {'&'} Conditions
                </span>
                <span className={styles['footer-links-text']} onClick={()=>handleNavigate("privacy")}>
                    Privacy Policy
                </span>
              </div>
          </div>

          <div style={{position:"relative",  backgroundColor: "#040F08", marginRight:"auto", userSelect:"none"}}>
            <div className={styles['thumbprint-bottom-left']} style={{ bottom:"0vh",zIndex:0}}>
            </div>
          </div>
        </div>
        }

      </section>
    }
 {(screenWidth>480)&&<>
        <div style={{ transform:"translateY(2.125rem) translateX(6.2rem)",
            zIndex:"1",display:"flex", gap:".5rem",marginRight:"auto"}}>
              <p className={styles["footer-logo-text"]} style={{paddingLeft:".9em"}}>
                BLACK
              </p>
              <p className={styles["footer-logo-text"]} 
              style={{fontSize:"clamp(6px, 4vw, 16px)", lineHeight:"24px"}}>
                •
              </p>
              <p className={styles["footer-logo-text"]}>
                PRINT
              </p>
              <span className={styles["footer-text-icon"]}/>
        </div>
        <div className={styles['footer-links-container']}>
            <div className={styles['footer-links-column']}>
                <span className={styles['footer-links-text']} onClick={()=>handleButtonClick("catalog")}>
                  Recent Work
                </span>
                <span className={styles['footer-links-text']} onClick={()=>handleButtonClick("packages")}>
                  Pricing
                </span>
                <span className={styles['footer-links-text']} onClick={()=>handleButtonClick("faqs")}>
                  FAQ
                </span>
            </div>
            <div className={styles['footer-links-column']}>
              <span className={styles['footer-links-text']} onClick={()=>handleStripeLogin()}>
                  Client Login
              </span>
              <span className={styles['footer-links-text']} onClick={()=>handleNavigate("terms")}>
                  Terms {'&'} Conditions
              </span>
              <span className={styles['footer-links-text']} onClick={()=>handleNavigate("privacy")}>
                  Privacy Policy
              </span>
            </div>
        </div>
        </>
        }
        {(screenWidth>480)&&
        <div style={{display:"flex", alignSelf:"flex-start", paddingLeft:(screenWidth>480)?"7.5rem":"2rem", transform:(screenWidth>480)?"translateY(-3.125rem)":"translateY(-6rem)"}} ref={bottomRef} >
            <p className={styles['timestamp-footer']}>
              © 2023
            </p>
        </div>
        }

    
      </div>
 



      <div style={{position:"relative", backgroundColor: "#040F08", userSelect:"none"}}>
          <div className={styles['thumbprint-bottom-right']} style={{bottom:"0vh", right:"0vw",zIndex:0}}>

          </div>
        </div>
        <div style={{position:"relative",  backgroundColor: "#040F08", marginRight:"auto", userSelect:"none"}}>
          <div className={styles['thumbprint-bottom-left']} style={{ bottom:"0vh",zIndex:0}}>

          </div>
        </div>
        <div style={{position:"relative",  backgroundColor: "#040F08", marginRight:"auto", userSelect:"none"}}>
          <div className={styles['thumbprint-top-left']} style={{top:"-38.5rem",zIndex:0}}>

          </div>
        </div>
        <div style={{position:"relative",  backgroundColor: "#040F08", mixBlendMode:"overlay"}}>
          <div className={styles['thumbprint-top-right']} style={{top:"-37.75rem", right:"0vw",zIndex:0}}>

          </div>
        </div>

        
    </main>

    </>
  )
}
