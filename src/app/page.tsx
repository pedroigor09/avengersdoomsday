import Image from "next/image";
import { CountdownTimer } from "@/components/CountdownTimer";
import { SnowEffect } from "@/components/SnowEffect";
import { NeonFog } from "@/components/NeonFog";

export default function Home() {
  // Data de lançamento: 18 de dezembro de 2026
  const releaseDate = new Date("2026-12-18T00:00:00");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Névoa verde neon */}
      <NeonFog />

      {/* Background Image com Blur */}
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
        {/* Overlay escuro para melhorar legibilidade */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Countdown Timer */}
      <main className="relative z-10 flex items-center justify-center px-4 animate-slide-up">
        <CountdownTimer targetDate={releaseDate} />
      </main>

      {/* Efeito de neve verde */}
      <SnowEffect />
    </div>
  );
}
