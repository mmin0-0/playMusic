import styled, {keyframes} from 'styled-components';
import media from '../styles/media.js';
import { Controls, DefaultBtn } from './Button.jsx';
import { Image } from './Image';
import { useEffect, useRef, useState } from 'react';
import { blank, spacing, flexBox, border, ellipsis, position, size } from '../styles/utils.js';
import { P, Span } from './Text.jsx';

const playing = keyframes`
  0 {transform: scale(1.2) rotate(0deg);}
  100% {transform: scale(1.2) rotate(360deg);}
`;
const PlayerWrap = styled.div`
  ${size('82rem', '6rem')};
  ${position('fixed', {left: '18rem', bottom: '2rem'})};
  ${blank.px(2,2)}
  border-radius: 2rem;
  backdrop-filter: blur(20px);
  background: hsla(0, 0%, 100%, .1);
  ${media.lg`
    ${size('90%', '8rem')};
    left: 50%;
    transform: translateX(-50%);
  `}
`;
const PlayInfo = styled.div`
  ${size(undefined, '100%')};
  ${flexBox('row', 'space-between', 'center', '','2rem')};
  }
`;
const PlayerInfo = styled.div`
  ${size('60%', undefined)};
  ${flexBox('row', 'flex-start', 'center','','2rem')};
  ${media.lg`width: 50%;`}
  .thumbnail{
    ${position('relative', {}, 'translateY(-35%)')};
    ${size('10rem', '10rem')};
    min-width: 10rem;
    overflow: hidden;
    border-radius: 50%;
    background: ${({ theme }) => theme.grey};
    ${border('1px', 'solid', ({theme}) => theme.mainColor)};
    &.on{img{animation: ${playing} 5s linear infinite;}}
    &::before{
      content: '';
      ${size('2.4rem', '2.4rem')};
      ${position('absolute', {top: '50%', left: '50%'}, 'translate(-50%,-50%)')};
      z-index: 1;
      border-radius: 50%;
      background: ${({theme}) => theme.darkgrey};
    }
    img{
      ${size('100%', '100%')};
      object-fit: cover;
      transform: scale(1.2);
    }
    ${media.lg`display: none;`}
  }
  .player-info{
    ${size('calc(100% - 12rem)', undefined)};
    ${media.lg`width: 100%;`}
    *{${ellipsis(1)};}
    span{${spacing.mt(1)}}
  }
`;
const PlayerControls = styled.div`
  ${size('40%', undefined)};
  ${flexBox('row', 'flex-end', 'center','','2rem')}
  ${media.lg`width: 50%;`}
  ${media.sm`
    ${flexBox('column', 'center', 'flex-end','','1rem')}
  `}
  .player-range{
    min-height: 2rem;
    ${media.sm`width: 100%;`}
    input[type="range"]{
      ${size('100%', '5px')};
      background: rgba(255,255,255, .3);
      border-radius: 1.5rem;
      -webkit-appearance: none;
      &::-webkit-slider-thumb {
        ${size('1.2rem', '1.2rem')};
        cursor: pointer;
        background: ${({ theme }) => theme.colors.white};
        border: 0;
        outline: 0;
        border-radius: 50%;
        -webkit-appearance: none;
      }
    }
  }
  .player-btns{${flexBox('row', 'flex-start', 'center', '', '1rem')};}
`;
const Empty = styled.div`
  height: 100%;
  ${flexBox('row', 'flex-start', 'center', '', '4rem')};
  .thumbnail{
    width: 10rem;
    height: 10rem;
    transform: translateY(-35%);
    border-radius: 50%;
    ${media.sm`display: none;`}
    }
  .player-info{
    width: 30%;
    ${media.sm`width: 100%;`}
    p{${ellipsis(1)};}
  }
  .player-btns{
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
  }
`;

function FixPlayer({ selectedPlaylist, onSave, isSaved }) {
  const [pause, setPause] = useState(false);
  const iframeRef = useRef(null);
  const thumbnailRef = useRef(null);

  // 재생/정지 핸들러
  const playApi = () => {
    setPause((prevPause) => {
      if (prevPause) {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        if (thumbnailRef.current) {
          thumbnailRef.current.classList.remove('on');
        }
      } else {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        if (thumbnailRef.current) {
          thumbnailRef.current.classList.add('on');
        }
      }
      return !prevPause;
    });
  };

  // 저장 핸들러
  const handleSave = () => {
    if (selectedPlaylist) {
      alert('재생목록에 추가되었습니다!');
      onSave(selectedPlaylist);
    }
  };

  // 다른 플레이리스트 선택시(초기화)
  useEffect(()=>{
    if(thumbnailRef.current){
      thumbnailRef.current.classList.remove('on');
    }
    setPause(false);
  }, [selectedPlaylist]);

  // 볼륨조절 핸들러
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    iframeRef.current.contentWindow.postMessage(`{"event":"command", "func":"setVolume", "args":[${newVolume}]}`, '*');
  };
  const saveButtonClass = isSaved ? 'save' : '';

  if (!selectedPlaylist) {
    return (
      <PlayerWrap>
        <Empty>
          <div className="thumbnail">
            <Image src="empty_icon.png" alt="play new" />
          </div>
          <div className="player-info">
            <P fontSize="1.4rem">재생목록이 없습니다.</P>
          </div>
          <div className="player-btns">
            <Controls />
          </div>
        </Empty>
      </PlayerWrap>
    );
  }

  const playlistId = selectedPlaylist.id?.playlistId;
  if (!playlistId) {
    return <div>Playlist ID is not available</div>;
  }

  return (
    <PlayerWrap>
      <PlayInfo>
        <iframe
          ref={iframeRef}
          width="1"
          height="1"
          src={`https://www.youtube.com/embed?listType=playlist&list=${playlistId}&enablejsapi=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ opacity: 0, position: 'absolute' }}
        />
        <PlayerInfo>
          <div className="thumbnail" ref={thumbnailRef}>
            <img src={selectedPlaylist.snippet.thumbnails.default.url} alt={selectedPlaylist.snippet.title}/>
          </div>
          <div className="player-info">
            <P fontSize="1.4rem">{selectedPlaylist.snippet.title}</P>
            <Span fontSize="1.4rem">{selectedPlaylist.snippet.channelTitle}</Span>
          </div>
        </PlayerInfo>
        <PlayerControls>
          <div className="player-range">
            <input 
              type="range" 
              id="volume" 
              min="0" 
              max="100" 
              defaultValue="50" 
              onChange={handleVolumeChange}
            />
            <label htmlFor="volume" className="hide">volume</label>
          </div>
          <div className="player-btns">
            <Controls onClick={playApi} isPaused={pause} />
            <DefaultBtn className={`player-add ${saveButtonClass}`} onClick={handleSave}>
              <Image src="save_icon.svg" alt="save" className="off" />
              <Image src="save_add_icon.svg" alt="save" className="on" />
            </DefaultBtn>
          </div>
        </PlayerControls>
      </PlayInfo>
    </PlayerWrap>
  )
}

export default FixPlayer;