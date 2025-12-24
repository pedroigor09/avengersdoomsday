"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { useEffect, useRef, useState } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const { months, days, hours, minutes, seconds, isComplete } = useCountdown(targetDate);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sinoRef = useRef<HTMLAudioElement | null>(null);
  const previousSecondsRef = useRef<number>(seconds);
  const previousMonthsRef = useRef<number>(months);
  const [isPlayingSino, setIsPlayingSino] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        setIsGlitching(false);
      }, 800); 
    }, 5000); 

    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio("/relogio.mp4");
    audioRef.current.volume = 0.5;
    
    sinoRef.current = new Audio("/sino.mp4");
    sinoRef.current.volume = 0.6;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (sinoRef.current) {
        sinoRef.current.pause();
        sinoRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (previousMonthsRef.current !== months && previousMonthsRef.current > months && sinoRef.current) {
      setIsPlayingSino(true);
      
      sinoRef.current.currentTime = 0;
      sinoRef.current.play().catch((error) => {
        console.log("Autoplay bloqueado:", error);
      });
      
      setTimeout(() => {
        if (sinoRef.current) {
          sinoRef.current.pause();
          sinoRef.current.currentTime = 0;
        }
        setIsPlayingSino(false);
      }, 12000);
    }
    previousMonthsRef.current = months;
  }, [months]);

  useEffect(() => {
    if (previousSecondsRef.current !== seconds && audioRef.current && !isPlayingSino) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.log("Autoplay bloqueado:", error);
      });
    }
    previousSecondsRef.current = seconds;
  }, [seconds, isPlayingSino]);

  if (!isMounted) {
    return (
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex items-center gap-4 md:gap-8">
          <div className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-[0.1em]">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white tracking-[0.2em]">
          IT&apos;S TIME
        </h1>
      </div>
    );
  }

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className={`flex items-center gap-4 md:gap-8 ${isGlitching ? 'glitch-active' : ''}`}>
        <TimeUnit value={formatNumber(months)} label="MONTHS" isGlitching={isGlitching} />
        <Separator />
        <TimeUnit value={formatNumber(days)} label="DAYS" isGlitching={isGlitching} />
        <Separator />
        <TimeUnit value={formatNumber(hours)} label="HOURS" isGlitching={isGlitching} />
        <Separator />
        <TimeUnit value={formatNumber(minutes)} label="MINUTES" isGlitching={isGlitching} />
        <Separator />
        <TimeUnit value={formatNumber(seconds)} label="SECONDS" isGlitching={isGlitching} />
      </div>
    </div>
  );
}

function TimeUnit({ value, label, isGlitching }: { value: string; label: string; isGlitching: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <span 
        className={`relative inline-block text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.1em] tabular-nums ${
          isGlitching ? 'animate-glitch' : ''
        }`}
        style={{
          textShadow: isGlitching 
            ? `-2px 0 #00b359, 2px 0 #4a5f4a, 0 0 15px #00cc66, 0 0 30px #00b359, 0 0 45px #00994d`
            : 'none',
          color: isGlitching ? '#00cc66' : '#ffffff',
          filter: isGlitching ? 'brightness(1.6) contrast(1.3) saturate(1.2)' : 'brightness(1.1)',
          transition: 'all 0.1s ease-out'
        }}
      >
        {value}
        
        {isGlitching && (
          <>
            <span 
              className="absolute top-0 left-0 opacity-75"
              style={{
                color: '#00cc66',
                transform: 'translateX(-2px)',
                clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                textShadow: '0 0 10px #00b359'
              }}
            >
              {value}
            </span>
            <span 
              className="absolute top-0 left-0 opacity-75"
              style={{
                color: '#5a6e5a',
                transform: 'translateX(2px)',
                clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
                textShadow: '0 0 10px #4a5f4a'
              }}
            >
              {value}
            </span>
          </>
        )}
      </span>
      <span className="text-[10px] md:text-xs text-white/80 tracking-[0.3em] mt-2 font-light">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span className="text-4xl md:text-6xl lg:text-7xl font-light text-white/60 -mt-8">
      :
    </span>
  );
}
