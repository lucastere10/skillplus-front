// components/MyLottieAnimation.js
import React from 'react';
import Lottie from 'react-lottie';
import LoadingSpinner from '@/../public/animations/HelpLottie.json'; // Caminho correto para o arquivo JSON

const HelpLottie = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: LoadingSpinner,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className='w-[300px] h-[300px] flex items-center justify-center relative'>
      <Lottie options={options} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} width={600} height={600}/>
    </div>
  );
  
};

export default HelpLottie;
