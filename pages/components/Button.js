import React from 'react';
import styles from '../../styles/V2.module.scss'
const Button = ({type, onHandlePayment, onHandleBooking}) => {

    return (
        <span onClick={()=>(type==="package")?onHandlePayment():
        (type==="booking")?onHandleBooking():
        console.log("missing portfolio link")}
        className={styles[`button-container-${type==="package"?"alt-":type==="booking"?"booking-":""}v2`]}
        >
            <div className={styles[`button-content-${type==="package"?"alt-":type==="booking"?"booking-":""}v2`]}>
                {(type!=="booking")&&
                <div className={styles[`button-icon-${type==="package"||type==="booking"?"alt-":""}v2`]}>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    width={type==="package"?"32":"39"} height={type==="package"?"32":"39"} viewBox={"0 0 39 39"} fill="none">
                        <path d="M19.5 35.1C10.9005 35.1 3.9 28.0995 3.9 19.5C3.9 10.9005 10.9005 3.9 19.5 3.9C28.0995 3.9 35.1 10.9005 35.1 19.5C35.1 28.0995 28.0995 35.1 19.5 35.1ZM19.5 39C30.264 39 39 30.264 39 19.5C39 8.736 30.264 0 19.5 0C8.736 0 0 8.736 0 19.5C0 30.264 8.736 39 19.5 39ZM17.55 19.5V27.3H21.45V19.5H27.3L19.5 11.7L11.7 19.5H17.55Z" fill="black"/>
                    </svg>
                </div>
                }
                <p className={styles[`button-text-${type==="package"||type==="booking"?"alt-":""}v2`]}>
                    {type==="package"?`Get started`:type==="booking"?"Book a demo":`View Portfolio`}
                </p>
            </div>
        </span>
    );
}

export default Button;
