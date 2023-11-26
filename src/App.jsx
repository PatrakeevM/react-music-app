import MainPage from "./pages/MainPage/MainPage";
import PlayBar from "./components/PlayBar/PlayBar";
import style from "./global.module.scss";

const App = () => (
  <div className={style.root}>
    <div className={style.wrapper}>
      <MainPage />
      <PlayBar />
    </div>
  </div>
);

export default App;
