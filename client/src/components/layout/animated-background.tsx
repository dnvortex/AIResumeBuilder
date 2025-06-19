import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min";

interface AnimatedBackgroundProps {
  children: React.ReactNode;
}

export function AnimatedBackground({ children }: AnimatedBackgroundProps) {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaEffect && backgroundRef.current) {
      setVantaEffect(
        WAVES({
          el: backgroundRef.current,
          THREE: THREE,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x3b82f6, // Primary blue color
          shininess: 35,
          waveHeight: 15,
          waveSpeed: 0.75,
          zoom: 0.85,
          backgroundColor: 0x050816 // Dark blue background
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <>
      <div ref={backgroundRef} className="w-full fixed top-0 left-0 h-screen" style={{ zIndex: -1 }} />
      <div className="min-h-screen w-full">{children}</div>
    </>
  );
}