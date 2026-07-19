import { useState, useEffect, useRef } from 'react'

import LoadingSpinner from "./loading.tsx"

import useIsVisible from './hooks/is-visible.tsx';


// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'

import {useDataStore} from "./globals.tsx"


function App() {
  const preloadedData = useDataStore((state) => state.preloadedData);

  const initData = useDataStore((state) => state.initData);
  const loadData = useDataStore((state) => state.loadData);


  const [dataIndex, setDataIndex] = useState(0);

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
    <div className={`${preloadedData.length < 3 ? "overflow-y-clip max-h-dvh h-dvh": "overflow-y-auto"}`}>
      {
        (preloadedData.length < 3) && (
          <div className="h-dvh w-dvw flex justify-center items-center bg-black z-100 absolute">
            <LoadingSpinner/>
          </div>
        )
      }

      {
        (
          <div className='flex flex-col'>
            {preloadedData.map((data, index) => (
              <div className='flex flex-col gap-6 z-0' key={index}>
                <img
                src={data.url}
                alt={"image of thingy"}
                className='h-dvh w-dvw object-cover'
                />

                <div className='gap-3 absolute opacity-50 z-10 pt-2 pl-4' key={index}>
                  <h1 className='text-white text-4xl font-medium'>{data.title}</h1>
                  <h2 className='text-white/75 text-2xl font-sans font-thin'>{data.date}</h2>
                </div>
              </div>
            
            ))}
            <div ref={loadingSpinner} className='flex flex-col w-dvw justify-center items-center py-16'>
              <LoadingSpinner />
            </div>
          </div>

        )
      }

    </div>

  )
}

export default App
