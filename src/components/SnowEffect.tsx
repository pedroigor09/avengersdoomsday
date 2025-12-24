"use client";

import { useEffect, useState } from "react";

interface SnowflakeStyle {
  left: string;
  fontSize: string;
  filter: string;
  animation: string;
  opacity: number;
}

export function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState<{
    small: SnowflakeStyle[];
    medium: SnowflakeStyle[];
    large: SnowflakeStyle[];
  } | null>(null);

  const random = (min: number, max: number) => Math.random() * (max - min) + min;

  useEffect(() => {
    const generateSnowflake = (size: 'sm' | 'md' | 'lg'): SnowflakeStyle => {
      const left = random(-20, 120);
      const blur = random(0, 1);
      const flickrDuration = random(2, 4);
      const flickrDelay = random(-2, 0);
      const fallDuration = random(10, 25);
      const fallDelay = random(-20, 0);
      
      let fontSize = '10px';
      let opacity = 0.4;
      
      if (size === 'md') {
        fontSize = '15px';
        opacity = 0.5;
      } else if (size === 'lg') {
        fontSize = '22px';
        opacity = 0.6;
      }
      
      return {
        left: `${left}vw`,
        fontSize,
        filter: `blur(${blur}px)`,
        animation: `${flickrDuration}s flickr ${flickrDelay}s infinite, ${fallDuration}s fall ${fallDelay}s infinite`,
        opacity
      };
    };

    setSnowflakes({
      small: Array.from({ length: 60 }, () => generateSnowflake('sm')),
      medium: Array.from({ length: 15 }, () => generateSnowflake('md')),
      large: Array.from({ length: 10 }, () => generateSnowflake('lg'))
    });
  }, []);

  if (!snowflakes) return null;

  return (
    <div className="snowflake-area">
      {/* Small snowflakes */}
      {snowflakes.small.map((style, i) => (
        <div 
          key={`sm-${i}`} 
          className="snowflake"
          style={style}
        >
          ❄️
        </div>
      ))}
      
      {/* Medium snowflakes */}
      {snowflakes.medium.map((style, i) => (
        <div 
          key={`md-${i}`} 
          className="snowflake"
          style={style}
        >
          ❄️
        </div>
      ))}
      
      {/* Large snowflakes */}
      {snowflakes.large.map((style, i) => (
        <div 
          key={`lg-${i}`} 
          className="snowflake"
          style={style}
        >
          ❄️
        </div>
      ))}
    </div>
  );
}
