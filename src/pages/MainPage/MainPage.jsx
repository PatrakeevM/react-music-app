import React from "react";
import { Input } from "@mui/material";

import Track from "../../components/Track/Track";
import trackList from "../../assets/TrackList";
import style from "./MainPage.module.scss";

const runSearch = (query) => {
  if (!query) return trackList;

  const lowerCaseQuery = query.toLowerCase();

  return trackList.filter(
    (track) =>
      track.title.toLowerCase().includes(lowerCaseQuery) ||
      track.artists.toLowerCase().includes(lowerCaseQuery)
  );
};

const MainPage = () => {
  const [tracks, setTracks] = React.useState(trackList);

  const handleChange = (e) => {
    const foundedTracks = runSearch(e.target.value);
    setTracks(foundedTracks);
  };

  return (
    <div className={style.search}>
      <Input
        className={style.input}
        placeholder="Введите название трека"
        onChange={handleChange}
      />
      <div className={style.list}>
        {tracks.map((track) => (
          <Track key={track.id} {...track} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
