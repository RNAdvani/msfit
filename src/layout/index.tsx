import gsap from 'gsap'
import Content from './content'
import { useEffect, useRef, useState } from 'react'
import { data } from '../data'
import Canvas from './canvas'
import { BagData } from '../types'



const Banner = () => {
  const bannerRef = useRef(null);

  const [activeData, setActiveData] = useState<BagData>(data[1]);

  const handleSwatchClick = (item:BagData) =>{
    if(activeData.id !== item.id){
      setActiveData(item);
    }
  }

  useEffect(() => {
    gsap.to(bannerRef.current,{
      backgroundColor: activeData.backgroundColor,
      ease: 'power3.inOut',
      duration: 0.8,
    })

    gsap.to(".logo",{
      color: activeData.headingColor,
      ease: 'power3.inOut',
      duration: 0.8,
    })


  
    return () => {}
  }, [activeData])
  

  return (
    <div ref={bannerRef} className='w-screen h-screen relative'> 
        <div className='logo absolute my-2 ml-6 text-left text-2xl font-bold tracking-widest md:ml-28 lg:ml-[12vw] lg:my-8'>
            MSFIT.
        </div>
        <div className="w-full h-full flex justify-between items-center flex-col lg:flex-row-reverse">
            <Canvas activeData={activeData} swatchData={data} handleSwatchClick={handleSwatchClick} />
            <Content activeData={activeData}  />
        </div>
    </div>
  )
}

export default Banner