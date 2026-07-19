import { create } from 'zustand';
const API_KEY = import.meta.env.VITE_NASA_API;

function generateRandomDate(): any{
const startTimestamp = new Date(1995, 6, 16).getTime()
const endTimestamp = new Date().getTime()

const randomTimestamp = new Date(Math.random() * (endTimestamp - startTimestamp) + startTimestamp)

var rawDate  = new Date(randomTimestamp)
return rawDate.toLocaleDateString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'});
}

function preloadImage(url: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {resolve(img)};

    img.onerror = () => reject(new Error(`Aint no load ${url}`)); 
  });
};


interface DataState {
    preloadedData: any[];

    fetchData: (currentURL:string) => Promise<void>;
    initData: () => Promise<void>;
    loadData: () => Promise<void>;
}

export const useDataStore = create<DataState>((set, get) => ({
    preloadedData: [],

    fetchData: async (currentURL:string) => {
        try {
            const response = await fetch(currentURL);
            const result = await response.json();
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
            console.error("Fetch failed", error);
        }
    },

    initData: async()=>{
        const maxPreloadAmount = 10
        for (var i = 0; i < maxPreloadAmount; i++){
            await get().loadData()
        }
    },

    loadData: async()=>{

        var newData: any = null;

        while (true){
            const url: string = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${generateRandomDate()}`
            newData = await get().fetchData(url)

            if (newData.media_type == "image"){
                break
            }

        }

        const imageURL = newData.url
        await preloadImage(imageURL)

        set((state)=>({ preloadedData: [...state.preloadedData, newData] }));

        console.log(get().preloadedData)
    
    },
}));
