import React from "react";

import Track from "../../components/Track/Track";
import trackList from "../../assets/TrackList";
import style from "./MainPage.module.scss";

const MainPage = () => (
  <div className={style.search}>
    <>Поиск треков</>
    <div className={style.list}>
      {trackList.map((track) => (
        <Track key={track.id} {...track} />
      ))}
    </div>
  </div>
);

export default MainPage;
