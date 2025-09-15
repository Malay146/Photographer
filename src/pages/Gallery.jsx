import React from 'react'
import DomeGallery from '../components/DomeGallery'

const Gallery = () => {
  return (
    <div className='w-screen h-screen relative'>
      <div className="w-full h-full absolute flex flex-col bg-black bg-opacity-25 justify-center items-center pointer-events-none z-[9]">
        <h1 className='title text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-play uppercase font-bold difference z-[9]'>Moments</h1>
        <p className='font-lato text-base sm:text-lg md:text-xl tracking-tighter font-bold'>Grab to move and Click to view</p>
      </div>
      <DomeGallery 
        grayscale={false} 
        segments={34} 
        maxVerticalRotationDeg={8} 
        minRadius={window.innerWidth < 768 ? 900 : 1800}
        openedImageHeight={window.innerWidth < 768 ? '300' : '400'} 
        openedImageWidth={window.innerWidth < 768 ? '300' : '400'} 
        dragDampening={0.8} 
        padFactor={0.25} 
        dragSensitivity={30} 
        maxRadius={Infinity} 
      />
    </div> 
  )
}

export default Gallery