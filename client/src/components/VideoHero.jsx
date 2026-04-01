import { motion } from 'framer-motion';

export default function VideoHero() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <video
        className="absolute inset-0 w-full h-full object-cover scale-110 opacity-60"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/landingbg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}

