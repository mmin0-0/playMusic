import { useState } from "react";
import styled from 'styled-components';
import media from '../styles/media.js';
import useYoutubeSearch from "../hooks/useYoutubeSearch.js";
import { Loading, Empty } from '../components/common/StatusMessage.jsx';
import { MusicList } from '../components/MusicList/Playlist.jsx';
import { SearchBar } from "../components/common/SearchBar.jsx";

function Search({onPlaylistClick}) {
  const { playlists, searchPlaylists, loading, error } = useYoutubeSearch();

  return (
    <section>
      <div className="tit-wrap">
        <strong>원하는 플레이리스트를 검색해보세요🎧</strong>
      </div>
      <div className="cont-wrap">
        <SearchBar searchPlaylists={searchPlaylists}/>
        {loading && <Loading />}
        {error && <Empty
          error={error.message || 'An unexpected error occurred'}
          title="🚨검색 결과가 없습니다🚨"
        />}
        <MusicList playlists={playlists} onPlaylistClick={onPlaylistClick} />
      </div>
    </section>
  )
}

export default Search;