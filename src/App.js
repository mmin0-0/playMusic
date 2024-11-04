import styled from 'styled-components';
import media from './styles/media.js';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import GlobalStyle from "./styles/GlobalStyle.js";
import theme from "./styles/theme.js";
import Lnb from './components/Lnb.jsx';
import FixPlayer from './components/FixPlayer.jsx';
import Home from "./pages/Home.jsx";
import MyPlaylist from "./pages/MyPlaylist.jsx";
import Search from "./pages/Search.jsx";
import { DefaultBtn } from './components/Button.jsx';
import { Image } from './components/Image.jsx'; 

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

  const Wrap = styled.div`
    > button{
      display: none;
      position: absolute;
      top: 1rem;
      left: 1rem;
      img{max-width: 100%;}
      ${media.lg`display: block;`}
    }
  `;
  return (
    <>
    <ThemeProvider theme={theme}>
    <GlobalStyle />
      <div id="wrapper">
        <Wrap id="wrap">
          <DefaultBtn onClick={toggleLnb} size="medium">
            <Image src="menu_icon.svg" alt="menu toggle" />
          </DefaultBtn>
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
        </Wrap>
      </div>
    </ThemeProvider>
    </>
  );
}

export default App;
