import React from 'react';

interface CSSAnimatedBackgroundProps {
  children: React.ReactNode;
}

export function CSSAnimatedBackground({ children }: CSSAnimatedBackgroundProps) {
  return (
    <>
      <div className="css-animated-bg">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>
      <div className="content-container">
        {children}
      </div>
    </>
  );
}