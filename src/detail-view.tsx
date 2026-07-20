import { useState, useEffect, useRef } from 'react'

import LoadingSpinner from "./loading.tsx"

import useIsVisible from './hooks/is-visible.tsx';

import { PiDownloadSimpleBold } from "react-icons/pi";
import { FaCircleInfo } from "react-icons/fa6";


// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'

import {useDataStore} from "./globals.tsx"


function DetailView({data, setData}: {data: any, setData: React.Dispatch<React.SetStateAction<any>>} ) {
  return (
    <div className='max-w-6xl mx-auto px-8 overflow-y-hidden overflow-visible'>
      <button onClick={() => (setData(null))} className='flex w-full items-end justify-end pb-4 pr-4 pt-32'>X</button>
      <div className=''>
        <img
          src={data.url}
          alt={data.title}
          className='w-full rounded-xl'
        />
      </div>
      <h1 className='text-5xl font-semibold pt-8 pb-4'>{data.title}</h1>
      <h1 className='font-thin pb-4'>{data.explanation}</h1>
    </div>

  )
}

export default DetailView
