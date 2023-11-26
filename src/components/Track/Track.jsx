import React from "react";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import cn from "classnames";

import { AudioContext } from "../../contexts/AudioContext";
import secondsToMMSS from "../../utils/secondsToMMSS";
import style from "./Track.module.scss";

const Track = (track) => {
  const { preview, duration, title, artists } = track;

  const { handleToggleAudio, currentTrack, isPlaying } =
    React.useContext(AudioContext);

  const isCurrentTrack = currentTrack.id === track.id;

  const formatedDuration = secondsToMMSS(duration);

  return (
    <div className={cn(style.track, isCurrentTrack && style.playing)} onClick={() => handleToggleAudio(track)}>
      <IconButton onClick={() => handleToggleAudio(track)}>
        {isCurrentTrack && isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <img className={style.preview} src={preview} alt="" />
      <div className={style.credits}>
        <b>{title}</b>
        <p>{artists}</p>
      </div>
      <p>{formatedDuration}</p>
    </div>
  );
};

export default Track;