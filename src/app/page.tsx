import Image from "next/image";
import { CountdownTimer } from "@/components/CountdownTimer";
import { SnowEffect } from "@/components/SnowEffect";
import { NeonFog } from "@/components/NeonFog";

export default function Home() {
  const releaseDate = new Date("2026-12-18T00:00:00");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      <NeonFog />

      <div className="absolute inset-0 z-0 animate-fade-in">
        <Image
          src="/avengers2.jpg"
          alt="Avengers Background"
          fill
          className="object-cover opacity-40"
          style={{ 
            filter: "blur(1.5px)",
            objectPosition: "center center",
            transform: "scale(1.2)"
          }}
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <main className="relative z-10 flex items-center justify-center px-2 sm:px-4 animate-slide-up w-full">
        <CountdownTimer targetDate={releaseDate} />
      </main>

      <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 z-50 text-[10px] sm:text-xs text-white/40 tracking-widest font-light hover:text-[#00ff88] hover:drop-shadow-[0_0_8px_rgba(0,255,136,0.6)] transition-all duration-300">
        by: pedrodev
      </div>

      <SnowEffect />
    </div>
  );
}
