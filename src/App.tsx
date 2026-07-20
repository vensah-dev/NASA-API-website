import { useState, useEffect, useRef } from 'react'

import LoadingSpinner from "./loading.tsx"

import useIsVisible from './hooks/is-visible.tsx';

import { PiDownloadSimpleBold } from "react-icons/pi";
import { FaCircleInfo } from "react-icons/fa6";
import DetailView from './detail-view.tsx';

// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'

import {useDataStore} from "./globals.tsx"


function App() {
  const preloadedData = useDataStore((state) => state.preloadedData);

  const initData = useDataStore((state) => state.initData);
  const loadData = useDataStore((state) => state.loadData);


  const [dataIndex, setDataIndex] = useState(0);
  const [detailView, setDetailView] = useState(null);

  const loadingSpinner = useRef<HTMLInputElement>(null);
  const loadingSpinnerVisibility = useIsVisible(loadingSpinner);


  function nextData(){
    setDataIndex(dataIndex+1); 
    loadData(); 
  }
  function backData(){
    if(dataIndex-1 >= 0){
      setDataIndex(dataIndex-1); 
    }
  }

  useEffect(
    ()=>{
      initData()
    }, []
  );

  useEffect(
    () =>{

      (async ()=>{
        if (loadingSpinnerVisibility){
          var promises = []
          for (let i = 0; i < 3; i++){
            promises.push(loadData()); 
          }
          await Promise.all(promises)
        } 
      })();

    }, [loadingSpinner]

  );

  return (
    <div className={`${preloadedData.length < 3 ? "overflow-y-clip": "overflow-y-auto"} h-dvh w-dvw`}>
      {
        (preloadedData.length < 3) && (
          <div className="h-dvh w-dvw flex justify-center items-center bg-black z-100 absolute">
            <LoadingSpinner/>
          </div>
        )
      }

      {
        (detailView == null) ? (
          <div className='flex flex-col gap-24 py-32'>
            {preloadedData.map((data, index) => (
              <div className="relative w-6xl mx-8 mx-auto group hover:brightness-115" key={index} onClick={()=>{setDetailView(data); console.log("Button pressed", detailView)}}>

                <img
                  src={data.url}
                  alt="image of thingy"
                  className="w-6xl object-cover aspect-16/9 rounded-4xl overflow-clip"
                />

                <div className='group-hover:opacity-100 opacity-0 h-full w-full absolute inset-0'>

                  <div className="absolute flex top-4 left-4 opacity-50 ">
                    {/* <h1 className="text-white text-3xl font-semibold tracking-wide">{data.title}</h1> */}
                    <h2 className="text-white/75 font-thin pl-2 pr-4">
                      <FaCircleInfo className='h-full aspect-square'/>
                    </h2>
                    <h2 className="text-white text-2xl font-thin">{data.date}</h2>

                  </div>

                  {/* <div className='absolute flex bottom-4 left-4 gap-4'>

                    <button className="text-white/50 text-3xl font-bold hover:text-white/90" onClick={()=>{setDetailView(data); console.log("Button pressed", detailView)}}>
                      <FaCircleInfo className='h-full aspect-square'/>
                    </button>

                    <a className="text-white/50 text-3xl font-bold hover:text-white/90" href={data.hdurl}>
                      <PiDownloadSimpleBold className='h-full aspect-square'/>
                    </a>

                  </div> */}

                </div>


              </div>
            
            ))}
            <div ref={loadingSpinner} className='flex flex-col w-dvw justify-center items-center py-16'>
              <LoadingSpinner />
            </div>
          </div>

        ):
        (
          <DetailView data={detailView} setData={setDetailView}/>
        )
      }

    </div>

  )
}

export default App
