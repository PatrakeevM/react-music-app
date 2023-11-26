import React from "react";

import trackList from "../assets/TrackList";

const audio = new Audio(trackList[0].src);

export const AudioContext = React.createContext({});

const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = React.useState(trackList[0]);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleToggleAudio = (track) => {
    if (currentTrack.id !== track.id) {
      setCurrentTrack(track);
      setIsPlaying(true);

      audio.src = track.src;
      audio.load();
      audio.addEventListener("loadedmetadata", () => {
        audio.currentTime = 0;
        audio.play();
      });

      return;
    }
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const value = { audio, currentTrack, isPlaying, handleToggleAudio };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export default AudioProvider;
