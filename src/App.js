import { ThemeProvider } from 'styled-components';
import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import GlobalStyle from "./styles/GlobalStyle.js";
import theme from "./styles/theme.js";
import Lnb from './components/Lnb.jsx';
import FixPlayer from './components/FixPlayer.jsx';
import Home from "./pages/Home.jsx";
import MyPlaylist from "./pages/MyPlaylist.jsx";
import Search from "./pages/Search.jsx";
import { BtnSideHam } from './components/Button.jsx';

function App() {
  const [lnbActive, setLnbActive] = useState(false);
  const toggleLnb = () => setLnbActive(!lnbActive);

  const [myPlaylists, setMyPlaylists] = useState([]);
  const handleSave = (playlist) => {
    const isAlreadySaved = myPlaylists.some((e) => e.id.playlistId === playlist.id.playlistId);

    if (!isAlreadySaved) {
      setMyPlaylists((prevPlaylists) => [...prevPlaylists, playlist]);
    }
  };

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  return (
    <>
    <ThemeProvider theme={theme}>
    <GlobalStyle />
      <div id="wrapper">
        <div id="wrap">
          <BtnSideHam className="side-ham" onClick={toggleLnb} />
          <Lnb lnbActive={lnbActive} toggleLnb={toggleLnb} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home 
                onPlaylistClick={handlePlaylistClick} 
                savedPlaylists={myPlaylists}
              />} />
              <Route path="/playlist" element={<MyPlaylist 
                onPlaylistClick={handlePlaylistClick} 
                savedPlaylists={myPlaylists}
              />} />
              <Route path="/search" element={<Search 
                onPlaylistClick={handlePlaylistClick} 
                savedPlaylists={myPlaylists}
              />} />
            </Routes>
            <FixPlayer 
              selectedPlaylist={selectedPlaylist} 
              onSave={handleSave} 
              isSaved={myPlaylists.some((p) => p.id.playlistId === selectedPlaylist?.id.playlistId)}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
    </>
  );
}

export default App;
