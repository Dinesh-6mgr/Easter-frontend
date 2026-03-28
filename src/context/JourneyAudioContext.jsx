import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const JOURNEY_ROUTES = ['/journey/letter', '/journey/story', '/journey/game', '/journey/result'];
const AUDIO_SRC = '/audio/MAYA __ Official Song __ Deborah Tiwari Rai __ Good Friday.mp3';

const JourneyAudioContext = createContext(null);

export const useJourneyAudio = () => useContext(JourneyAudioContext);

export const JourneyAudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const location = useLocation();

  const isJourneyRoute = JOURNEY_ROUTES.some(r => location.pathname.startsWith(r));

  // Create audio once
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ''; };
  }, []);

  // Play/pause based on route
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isJourneyRoute) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
    }
  }, [isJourneyRoute]);

  // Sync mute
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) { audio.play().then(() => setPlaying(true)).catch(() => {}); }
    else { audio.pause(); setPlaying(false); }
  };

  return (
    <JourneyAudioContext.Provider value={{ playing, muted, setMuted, toggle }}>
      {children}
    </JourneyAudioContext.Provider>
  );
};
