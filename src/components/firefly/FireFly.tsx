

import React, { useEffect, useState } from 'react';
import styles from './fire-fly.module.css';
interface FireflyStyle {
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
}
const Firefly: React.FC = () => {
  const [fireflies, setFireflies] = useState<FireflyStyle[]>([]);

  useEffect(() => {
    const generatedFireflies = Array.from({ length: 25 }, () => ({
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      animationDelay: `${Math.random()*0.00000001}s`,
      animationDuration: `${5 + Math.random()*200}s`,
    }));
    
    setFireflies(generatedFireflies);
  }, []);

  return (
    <div className={styles.fireflyContainer}>
      {fireflies.map((style, index) => (
        <div key={index} className={styles.firefly} style={style} />
      ))}
    </div>
  );
};

export default Firefly;

