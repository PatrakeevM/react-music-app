import React from "react";
import { PlayArrow, Pause } from "@mui/icons-material";
import { Slider, IconButton } from "@mui/material";

import { AudioContext } from "../../contexts/AudioContext";
import secondsToMMSS from "../../utils/secondsToMMSS";
import style from "./PlayBar.module.scss";

const TimeControls = () => {
  const { audio, currentTrack } = React.useContext(AudioContext);

  const { duration } = currentTrack;

  const [currentTime, setCurrentTime] = React.useState(0);

  const formatedCurrentTime = secondsToMMSS(currentTime);

  const sliderCurrentTime = Math.round((currentTime / duration) * 100);

  const handleChangeCurrentTime = (_, value) => {
    const time = Math.round((value / 100) * duration);
    setCurrentTime(time);
    audio.currentTime = time;
  };

  React.useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(audio.currentTime);
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <>
      <p>{formatedCurrentTime}</p>
      <Slider
        step={1}
        min={0}
        max={100}
        value={sliderCurrentTime}
        onChange={handleChangeCurrentTime}
      />
    </>
  );
};

const PlayBar = () => {
  const { currentTrack, handleToggleAudio, isPlaying } =
    React.useContext(AudioContext);

  const { title, artists, duration, preview } = currentTrack;

  const formatedDuration = secondsToMMSS(duration);

  return (
    <div className={style.playbar}>
      <img className={style.preview} src={preview} alt="" />
      <IconButton onClick={() => handleToggleAudio(currentTrack)}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <div className={style.credits}>
        <h4>{title}</h4>
        <p>{artists}</p>
      </div>
      <div className={style.slider}>
        <TimeControls />
        <p>{formatedDuration}</p>
      </div>
    </div>
  );
};

export default PlayBar;
