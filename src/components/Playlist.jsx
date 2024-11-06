import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DefaultBtn } from "./Button.jsx";
import { Image } from './Image.jsx';
import { spacing, blank, border, size, flexBox } from '../styles/utils.js';
import { Span, P } from './Text.jsx';

const StyledMusicList = styled.ul`
  display: grid;
  gap: clamp(2rem, 2%, 4rem);
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
`;
const StyledMusicItem = styled.li`
  background: ${({ theme }) => theme.colors.darkgrey};
  border-radius: 2rem;
  ${border('1px', 'solid',({ theme }) => theme.colors.darkgrey)};
  transition: all .25s;
  &:hover{
    transform: translateY(-1rem);
    border-color: ${({ theme }) => theme.colors.mainColor};
  }
  a{
    ${size('100%', undefined)};
    ${flexBox('row', 'space-between', 'flex-start', '', '1rem')};
    ${blank.pc(2)};
  }
`;
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
  ${spacing.mt(2)};
  span{
    display: block;
    ${spacing.mt(2.4)};
    color: ${({ theme }) => theme.colors.grey};
  }
`;
const ControlsWrap = styled.div`
  button{&:not(:first-child){${spacing.mt(1)};}}
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

const MusicItem = ({ playlist, onClick, isSaved }) => {
  return (
    <StyledMusicItem onClick={onClick}>
      <Link to="#">
        <Thumbnail
          thumbnailUrl={playlist.snippet.thumbnails.default.url}
          title={playlist.snippet.title}
          channelTitle={playlist.snippet.channelTitle}
        />
        <Controls isSaved={isSaved} />
      </Link>
    </StyledMusicItem>
  )
};

const Thumbnail = ({ thumbnailUrl, title, channelTitle }) => {
  return (
    <ThumbnailWrap>
      <div className="thumbnail">
        <img src={thumbnailUrl} alt={title} />
      </div>
      <ThumbnailInfo>
        <P lineHeight="1.6">{title}</P>
        <Span>{channelTitle}</Span>
      </ThumbnailInfo>
    </ThumbnailWrap>
  )
};

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