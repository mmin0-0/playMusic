import React, { createContext, useState, useContext } from 'react';

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  return (
    <PlaylistContext.Provider value={{ selectedPlaylist, handlePlaylistClick }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return context;
};
