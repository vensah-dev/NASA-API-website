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
    imageUrl: any,
    apiUrl: string;
    data: any;

    setApiUrl: (newUrl: string) => void;
    fetchData: () => Promise<void>;
    initData: () => Promise<void>;
    loadData: () => Promise<void>;
}

export const useDataStore = create<DataState>((set, get) => ({
    preloadedData: [],
    imageUrl: null,
    apiUrl: `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`, // Default URL
    data: null,

    // Action to update the URL from anywhere
    setApiUrl: (newUrl:string) => set({ apiUrl: newUrl }),
    setImageUrl: (newUrl:string) => set({ imageUrl: newUrl }),

    // Action to fetch data using whatever the CURRENT url is
    fetchData: async () => {
        set({ data: null })


        // get() grabs the most up-to-date values from this store
        const currentUrl = get().apiUrl; 

        try {
            const response = await fetch(currentUrl);
            const result = await response.json();
            console.log(result)
            set({ data: result});
        } catch (error) {
            console.log(error)
            console.error("Fetch failed", error);
        }
    },

    initData: async()=>{
        const maxPreloadAmount = 25
        for (var i = 0; i < maxPreloadAmount; i++){
            await get().loadData()
        }
    },

    loadData: async()=>{

        while (true){
            const url: string = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${generateRandomDate()}`
            get().setApiUrl(url)
            await get().fetchData()

            if (get().data.media_type == "image"){
                break
            }

        }

        const newData = get().data


        const imageURL = newData.url
        await preloadImage(imageURL)

        const newPreloaded = get().preloadedData
        newPreloaded.push(newData)

        set({ preloadedData: newPreloaded });

        console.log(get().preloadedData)
    
    },
}));
