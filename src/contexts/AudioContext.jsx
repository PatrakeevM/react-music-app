import React from "react";

import trackList from "../assets/TrackList";

const audio = new Audio(trackList[0].src);

export const AudioContext = React.createContext({});

const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = React.useState(trackList[0]);
  const [currentTrackIndex, setCurrentTrackIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const playTrack = (track) => {
    audio.src = track.src;
    audio.load();
    audio.addEventListener("loadedmetadata", () => {
      audio.currentTime = 0;
    });
  };

  const handleToggleAudio = (track) => {
    if (currentTrack.id !== track.id) {
      setCurrentTrack(track);
      setIsPlaying(true);

      playTrack(track);
      audio.play();

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

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % trackList.length);
    setCurrentTrack(trackList[currentTrackIndex]);
    playTrack(trackList[currentTrackIndex]);
  };

  const value = {
    audio,
    currentTrack,
    isPlaying,
    nextTrack,
    handleToggleAudio,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export default AudioProvider;
