import React, {useState, useEffect} from 'react'
import Lottie, {useLottie} from 'lottie-react';
import styles from '../../styles/App.module.scss'
import fingerprintLottie from './data/print2.json'

export const Loading = () => {
    const printOptions = {
      loop:true,
      autoplay: true,
      animationData: fingerprintLottie,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      },
      playbackSpeed: 2
    }
    const {View} = useLottie(printOptions)

  return (
    <>
        {
            <div className={[styles["loading-container"],styles["print-icon-v2"]].join(' ')}>
            {View}
            </div>
        }
    </>
  )
}



export default Loading