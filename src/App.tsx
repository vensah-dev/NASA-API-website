import { useState } from 'react'
import { IoMdArrowDropright } from "react-icons/io";

import { Image } from "@unpic/react";
import LoadingSpinner from "./loading.tsx"


// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'

import { useEffect } from 'react';
import {useDataStore} from "./globals.tsx"
const API_KEY = import.meta.env.VITE_NASA_API;


function App() {
  const preloadedData = useDataStore((state) => state.preloadedData);

  const imageUrl = useDataStore((state) => state.imageUrl);
  const setImageUrl = useDataStore((state) => state.imageUrl);

  const apiUrl = useDataStore((state) => state.apiUrl);
  const setApiUrl = useDataStore((state) => state.setApiUrl);

  const fetchData = useDataStore((state) => state.fetchData);

  const data = useDataStore((state) => state.data);

  const initData = useDataStore((state) => state.initData);
  const loadData = useDataStore((state) => state.loadData);


  const [imageLoading, setImageLoading] = useState(true);
  const [dataIndex, setDataIndex] = useState(0);

  function nextData(){
    setDataIndex(dataIndex+1); 
    loadData(); 
    setImageLoading(true);
  }
  function backData(){
    if(dataIndex-1 >= 0){
      setDataIndex(dataIndex-1); 
      setImageLoading(true);

    }
  }

  useEffect(
    ()=>{
      initData()
    }, []
  );

  return (
    <div>
      {
        
        (loading || preloadedData.length < 3 || imageLoading || !preloadedData[dataIndex]) && (
          <div className="h-dvh w-dvw flex justify-center items-center bg-black z-100 absolute">
            <LoadingSpinner/>
          </div>
        )
      }

      {
        preloadedData[dataIndex] && (
          <div className='flex flex-col'>
            {preloadedData.map((data, index) => (
              <div className='flex flex-col gap-6 z-0' key={index}>
                <img
                src={data.url}
                alt={"image of thingy"}
                className='h-dvh w-dvw object-cover'
                onLoad={()=>(setImageLoading(false))}
                />

                <div className='gap-3 absolute opacity-50 z-10 pt-2 pl-4' key={index}>
                  <h1 className='text-white text-4xl font-medium'>{data.title}</h1>
                  <h2 className='text-white/75 text-2xl font-sans font-thin'>{data.date}</h2>
                </div>
              </div>
            
            ))}
            <div className='flex flex-col w-dvw justify-center items-center py-16'>
              <LoadingSpinner />
            </div>
          </div>

        )
      }

    </div>

  )
}

export default App
