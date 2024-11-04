import { MusicList } from '../components/Playlist.jsx';
import { TitWrap, P } from '../components/Text.jsx';

function MyPlaylist({ onPlaylistClick, savedPlaylists }) {
  return (
    <section>
      <TitWrap text="나의 플레이리스트💿" />
      <div className="cont-wrap">
      {
          savedPlaylists.length === 0 ? (
            <P>플레이리스트가 없습니다.</P>
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