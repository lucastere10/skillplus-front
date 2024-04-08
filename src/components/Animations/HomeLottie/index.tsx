// components/MyLottieAnimation.js
import React from 'react';
import Lottie from 'react-lottie';
import LoadingSpinner from '@/../public/animations/HomeLottie.json'; // Caminho correto para o arquivo JSON

const HomeLottie = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: LoadingSpinner,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <Lottie options={options} height={600} width={600} />
    </div>
  );
};

export default HomeLottie;
