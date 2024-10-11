import { MusicList } from '../components/MusicList/Playlist.jsx';

function MyPlaylist({ playlists, onPlaylistClick, savedPlaylists }) {
  return (
    <section>
      <div className="tit-wrap">
        <strong>나의 플레이리스트💿</strong>
      </div>
      <div className="cont-wrap">
      {
          savedPlaylists.length === 0 ? (
            <p>플레이리스트가 없습니다.</p>
          ) : (
            <MusicList 
              playlists={savedPlaylists}
              onPlaylistClick={onPlaylistClick}
            />
          )
        }
      </div>
    </section>
  )
}

export default MyPlaylist;