// components/MyLottieAnimation.js
import React from 'react';
import Lottie from 'react-lottie';
import LoadingSpinner from '@/../public/animations/LoginLottie.json'; // Caminho correto para o arquivo JSON

const LoginLottie = () => {
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

export default LoginLottie;
