import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingSpinner() {
    return(
        <div className="h-12 aspect-square">
            <AiOutlineLoading3Quarters className="h-full w-full animate-spin"/>
        </div>
    )
}
