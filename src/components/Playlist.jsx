import styled from 'styled-components';
import media from '../styles/media.js';
import { DefaultBtn } from "./Button.jsx";
import { Image } from './Image.jsx';

const StyledMusicList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(2rem, 2%, 4rem);
  ${media.lg`grid-template-columns: repeat(2, 1fr);`}
  ${media.sm`grid-template-columns: 1fr;`}
`;

export const MusicList = ({ playlists, onPlaylistClick, savedPlaylists = [] }) => {
  return (
    <StyledMusicList>
      {
        playlists.map((playlist, idx) => (
          <MusicItem 
            key={idx} 
            playlist={playlist} 
            onClick={() => onPlaylistClick(playlist)}
            isSaved={savedPlaylists.some(saved => saved.id.videoId === playlist.id.videoId)}
          />
        ))
      }
    </StyledMusicList>
  )
};

const StyledMusicItem = styled.li`
  background: ${({ theme }) => theme.darkgrey};
  border-radius: 2rem;
  border: 1px solid ${({ theme }) => theme.darkgrey};
  transition: all .25s;
  &:hover{
    transform: translateY(-1rem);
    border-color: ${({ theme }) => theme.mainColor};;
  }
  a{
    width: 100%;
    display: flex;
    gap: 1rem;
    padding: 2rem;
  }
`;

const MusicItem = ({ playlist, onClick, isSaved }) => {
  return (
    <StyledMusicItem onClick={onClick}>
      <a href="#" onClick={(e)=>e.preventDefault()}>
        <Thumbnail
          thumbnailUrl={playlist.snippet.thumbnails.default.url}
          title={playlist.snippet.title}
          channelTitle={playlist.snippet.channelTitle}
        />
        <Controls isSaved={isSaved} />
      </a>
    </StyledMusicItem>
  )
};

const ThumbnailWrap = styled.div`
  width: 100%;
  .thumbnail{
    height: 12rem;
    border-radius: 2rem;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const ThumbnailInfo = styled.div`
  margin-top: 2rem;
  p{line-height: 1.6;}
  span{
    display: block;
    margin-top: 2.4rem;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.grey};
  }
`;

const Thumbnail = ({ thumbnailUrl, title, channelTitle }) => {
  return (
    <ThumbnailWrap>
      <div className="thumbnail">
        <img src={thumbnailUrl} alt={title} />
      </div>
      <ThumbnailInfo>
        <p>{title}</p>
        <span>{channelTitle}</span>
      </ThumbnailInfo>
    </ThumbnailWrap>
  )
};

const ControlsWrap = styled.div`
  button{
    &:not(:first-child){margin-top: 1rem;}
  }
`;

const Controls = ({ isSaved }) => {
  return (
    <ControlsWrap>
      <DefaultBtn className="play">
        <Image src="play_icon.png" alt="play" />
      </DefaultBtn>
      <DefaultBtn className={isSaved ? 'player-add save' : 'player-add'}>
        <Image src="save_icon.svg" alt="save" className="off" />
        <Image src="save_add_icon.svg" alt="save" className="on" />
      </DefaultBtn>
    </ControlsWrap>
  )
};