import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const JOURNEY_ROUTES = ['/journey/letter', '/journey/story', '/journey/game', '/journey/result'];
const AUDIO_SRC = '/audio/MAYA __ Official Song __ Deborah Tiwari Rai __ Good Friday.mp3';
const SESSION_KEY = 'journeyAudioActive';
const TIME_KEY    = 'journeyAudioTime';

const JourneyAudioContext = createContext(null);
export const useJourneyAudio = () => useContext(JourneyAudioContext);

export const JourneyAudioProvider = ({ children }) => {
  const audioRef   = useRef(null);
  const pendingRef = useRef(false); // wants to play but blocked by autoplay policy
  const [playing, setPlaying] = useState(false);
  const [muted,   setMuted]   = useState(false);
  const location = useLocation();

  const isJourneyRoute = JOURNEY_ROUTES.some(r => location.pathname.startsWith(r));

  // ── Create audio element once ──────────────────────────────────────────────
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop   = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    // Restore position from last session
    const savedTime = parseFloat(sessionStorage.getItem(TIME_KEY) || '0');
    if (savedTime > 0) audio.currentTime = savedTime;

    // Save playback position every second so refresh can resume
    const saveInterval = setInterval(() => {
      if (!audio.paused) sessionStorage.setItem(TIME_KEY, audio.currentTime);
    }, 1000);

    return () => {
      clearInterval(saveInterval);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // ── Resume after refresh: first user interaction unlocks autoplay ──────────
  useEffect(() => {
    const wasActive = sessionStorage.getItem(SESSION_KEY) === '1';
    if (!wasActive || !isJourneyRoute) return;

    // Try immediately (works if browser allows)
    const audio = audioRef.current;
    if (!audio) return;

    audio.play()
      .then(() => { setPlaying(true); pendingRef.current = false; })
      .catch(() => {
        // Blocked — wait for first interaction then resume
        pendingRef.current = true;
        const resume = () => {
          if (!pendingRef.current) return;
          audio.play().then(() => { setPlaying(true); pendingRef.current = false; }).catch(() => {});
          document.removeEventListener('click', resume);
          document.removeEventListener('keydown', resume);
          document.removeEventListener('touchstart', resume);
        };
        document.addEventListener('click', resume, { once: true });
        document.addEventListener('keydown', resume, { once: true });
        document.addEventListener('touchstart', resume, { once: true });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only on mount

  // ── Play/pause based on route changes ─────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isJourneyRoute) {
      sessionStorage.setItem(SESSION_KEY, '1');
      audio.play()
        .then(() => { setPlaying(true); pendingRef.current = false; })
        .catch(() => {
          pendingRef.current = true;
          const resume = () => {
            if (!pendingRef.current) return;
            audio.play().then(() => { setPlaying(true); pendingRef.current = false; }).catch(() => {});
          };
          document.addEventListener('click', resume, { once: true });
          document.addEventListener('touchstart', resume, { once: true });
        });
    } else {
      // Left journey — stop and clear session flag
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(TIME_KEY);
      pendingRef.current = false;
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
    }
  }, [isJourneyRoute]);

  // ── Sync mute ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => { setPlaying(true); pendingRef.current = false; }).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <JourneyAudioContext.Provider value={{ playing, muted, setMuted, toggle }}>
      {children}
    </JourneyAudioContext.Provider>
  );
};
