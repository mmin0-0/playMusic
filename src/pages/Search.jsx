import useYoutubeSearch from "../hooks/useYoutubeSearch.js";
import { Loading, Empty } from '../components/StatusMessage.jsx';
import { MusicList } from '../components/Playlist.jsx';
import { SearchBar } from "../components/SearchBar.jsx";
import { TitWrap } from "../components/Text.jsx";

export default function Search({onPlaylistClick}) {
  const { playlists, searchPlaylists, loading, error } = useYoutubeSearch();

  return (
    <section>
      <TitWrap text="원하는 플레이리스트를 검색해보세요🎧" />
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
