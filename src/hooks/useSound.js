import { useCallback } from 'react';

// Simple Web Audio API sound effects — no external files needed
const createBeep = (frequency, duration, type = 'sine', volume = 0.3) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch {
    // Audio not supported — silently ignore
  }
};

export const useSound = () => {
  const playSound = useCallback((type) => {
    switch (type) {
      case 'collect': createBeep(523, 0.1, 'sine');   break; // C5
      case 'golden':  createBeep(880, 0.3, 'sine', 0.4); break; // A5
      case 'bomb':    createBeep(150, 0.4, 'sawtooth', 0.5); break;
      case 'start':   createBeep(440, 0.2, 'sine');   break;
      case 'gameOver':createBeep(220, 0.6, 'triangle'); break;
      default: break;
    }
  }, []);

  return { playSound };
};
