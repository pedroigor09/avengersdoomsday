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

  // Inicializar áudios
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

  // Tocar sino quando mês muda
  useEffect(() => {
    if (previousMonthsRef.current !== months && previousMonthsRef.current > months && sinoRef.current) {
      setIsPlayingSino(true);
      
      // Tocar sino
      sinoRef.current.currentTime = 0;
      sinoRef.current.play().catch((error) => {
        console.log("Autoplay bloqueado:", error);
      });
      
      // Parar após 12 segundos e voltar ao tick
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

  // Tocar som do tick quando segundos mudam (mas não durante o sino)
  useEffect(() => {
    if (previousSecondsRef.current !== seconds && audioRef.current && !isPlayingSino) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.log("Autoplay bloqueado:", error);
      });
    }
    previousSecondsRef.current = seconds;
  }, [seconds, isPlayingSino]);

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
      {/* Timer */}
      <div className="flex items-center gap-4 md:gap-8">
        <TimeUnit value={formatNumber(months)} label="MONTHS" />
        <Separator />
        <TimeUnit value={formatNumber(days)} label="DAYS" />
        <Separator />
        <TimeUnit value={formatNumber(hours)} label="HOURS" />
        <Separator />
        <TimeUnit value={formatNumber(minutes)} label="MINUTES" />
        <Separator />
        <TimeUnit value={formatNumber(seconds)} label="SECONDS" />
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-[0.1em] tabular-nums">
        {value}
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
