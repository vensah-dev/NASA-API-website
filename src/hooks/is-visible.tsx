import { useState, useEffect } from 'react';

export default function useIsVisible(ref:any) {
  const [isIntersecting, setIntersecting] = useState(false);

  console.log(ref)

  useEffect(() => {
    // Create an IntersectionObserver to observe the ref's visibility
    if(ref.current == null) return
    const observer = new IntersectionObserver(([entry]) => 
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);

    // Cleanup the observer when the component unmounts or ref changes
    return () => {
      observer.disconnect();
    };
  }, [ref.current]);

  return isIntersecting;
}