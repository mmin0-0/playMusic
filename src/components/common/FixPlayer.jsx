import styled, {keyframes} from 'styled-components';
import media from '../../styles/media.js';
import { BtnSave, Controls } from './Buttons/Btns.jsx';
import { useEffect, useRef, useState } from 'react';

const playing = keyframes`
  0 {transform: scale(1.2) rotate(0deg);}
  100% {transform: scale(1.2) rotate(360deg);}
`;

const PlayerWrap = styled.div`
  width: 82rem;
  height: 6rem;
  position: fixed;
  left: 18rem;
  bottom: 2rem;
  border-radius: 2rem;
  padding: 0 2rem;
  backdrop-filter: blur(20px);
  background: hsla(0, 0%, 100%, .1);
  ${media.lg`
    width: 90%;
    height: 8rem;
    left: 50%;
    transform: translateX(-50%);
  `}
`;
const PlayInfo = styled.div`
  height: 100%;
  gap: 2rem;
  display: flex;
  align-items: space-between;
  justify-content: center;
  }
`;
const PlayerInfo = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  ${media.lg`width: 50%;`}
  .thumbnail{
    position: relative;
    width: 10rem;
    min-width: 10rem;
    height: 10rem;
    overflow: hidden;
    transform: translateY(-35%);
    border-radius: 50%;
    background: ${({ theme }) => theme.grey};
    border: 1px solid ${({theme}) => theme.mainColor};
    &.on{img{animation: ${playing} 5s linear infinite;}}
    &::before{
      content: '';
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 1;
      transform: translate(-50%, -50%);
      background: ${({theme}) => theme.darkgrey};
    }
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1.2);
    }
    ${media.lg`display: none;`}
    }
  .player-info{
    width: calc(100% - 12rem);
    ${media.lg`width: 100%;`}
    *{
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p{font-size: 1.4rem;}
    span{
      margin-top: 1rem;
      font-size: 1.2rem;
    }
  }
`;
const PlayerControls = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2rem;
  ${media.lg`width: 50%;`}
  ${media.sm`
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: 1rem;
  `}
  .player-range{
    min-height: 2rem;
    ${media.sm`width: 100%;`}
    input[type="range"]{
      width: 100%;
      height: 5px;
      background: rgba(255,255,255, .3);
      border-radius: 1.5rem;
      -webkit-appearance: none;
      &::-webkit-slider-thumb {
        width: 1.2rem;
        height: 1.2rem;
        cursor: pointer;
        background: ${({ theme }) => theme.white};
        border: 0;
        outline: 0;
        border-radius: 50%;
        -webkit-appearance: none;
      }
    }
  }
  .player-btns{
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const Empty = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 4rem;
  .thumbnail{
    width: 10rem;
    height: 10rem;
    transform: translateY(-35%);
    border-radius: 50%;
    ${media.sm`display: none;`}
    img{max-width: 100%;}
    }
  .player-info{
      width: 30%;
      ${media.sm`width: 100%;`}
    p{
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 1.4rem;
    }
  }
  .player-btns{
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
  }
`;
const EmptyWrap = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.grey};
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
            <img src={`${process.env.PUBLIC_URL}/images/empty_icon.png`} alt="play now" />
          </div>
          <div className="player-info">
            <p>재생목록이 없습니다.</p>
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
            <img src={selectedPlaylist.snippet.thumbnails.default.url} alt={selectedPlaylist.snippet.title} />
          </div>
          <div className="player-info">
            <p>{selectedPlaylist.snippet.title}</p>
            <span>{selectedPlaylist.snippet.channelTitle}</span>
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
            <label htmlFor="volume" className="hide">볼륨</label>
          </div>
          <div className="player-btns">
            <Controls onClick={playApi} isPaused={pause} />
            <BtnSave className={`player-add ${saveButtonClass}`} onClick={handleSave} />
          </div>
        </PlayerControls>
      </PlayInfo>
    </PlayerWrap>
  )
}

export default FixPlayer;