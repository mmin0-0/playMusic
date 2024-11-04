import { useEffect } from "react";
import useYoutubeSearch from "../hooks/useYoutubeSearch.js";
import { MusicList } from '../components/Playlist.jsx';
import { Loading, Empty } from '../components/StatusMessage.jsx';

function Home({onPlaylistClick}) {
  const { playlists, searchPlaylists, loading, error } = useYoutubeSearch();

  useEffect(() => {
    searchPlaylists('', 15);
  }, []);

  return (
    <section>
      <div className="tit-wrap">
        <strong>오늘의 플레이리스트를 추천합니다😊</strong>
      </div>
      <div className="cont-wrap">
        {loading && <Loading />}
        {error && <Empty 
          error={error.message || 'An unexpected error occurred'} 
          title="🚨추천드릴 플레이리스트가 없습니다🚨"
        />}
        <MusicList playlists={playlists} onPlaylistClick={onPlaylistClick} />
      </div>
    </section>
  )
}

export default Home;