'use client'
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [name, setName] = useState('')

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, #3D0E5E 0%, #8B1A6A 40%, #C0382A 70%, #D4561C 100%)",
        }}
      />

      {/* Ripple rings */}
      <div className="absolute inset-0 overflow-hidden">
        {[580, 480, 380, 290, 210, 140, 80].map((r, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/[0.07]"
            style={{
              width: r * 2,
              height: r * 1.9,
              left: "20%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              borderWidth: `${38 - i * 4}px`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-20">

        {/* Logo badge */}
        <div
          className="w-24 h-24 rounded-3xl mb-9 flex items-center justify-center relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #8B3080 0%, #C84B30 100%)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl" />
          <span className="relative text-white font-bold text-3xl tracking-tight font-serif">
            Vics<sup className="text-lg font-normal"></sup>
          </span>
        </div>
        <div className="relative">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all duration-200"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-semibold text-white mb-5 tracking-tight">
          {"Hoczi.com"}
        </h1>

        {/* Subtitle */}
        <p className="text-white/70 text-base leading-relaxed max-w-sm mb-11">
          From basic to advanced: test how well you know JavaScript, refresh
          your knowledge a bit, or prepare for your coding interview.
        </p>

        {/* Start button */}
        <Link href={`/do-exercise?name=${name}`} className="w-80 max-w-full py-4 bg-white rounded-xl text-gray-900 font-medium text-lg hover:bg-gray-100 active:scale-95 transition-all duration-150">
          Start
        </Link>
      </div>
    </main>
  );
}
