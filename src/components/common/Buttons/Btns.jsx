import styled from 'styled-components';
import media from '../../../styles/media.js';

const Closed = styled.button`
  width: 2rem;
  height: 2rem;
  img{max-width: 100%;}
`;

export const BtnClosed = ({ className, onClick }) => {
  return (
    <Closed type="button" className={className} onClick={onClick}>
      <img src={`${process.env.PUBLIC_URL}/images/closed_icon.png`} alt="closed" />
    </Closed>
  )
};

const HambergerMenu = styled.button`
  display: none;
  width: 3.2rem;
  position: absolute;
  top: 1rem;
  left: 1rem;
  img{max-width: 100%;}
  ${media.lg`display: block;`}
`;

export const BtnSideHam = ({ className, onClick }) => {
  return (
    <HambergerMenu type="button" className={className} onClick={onClick}>
      <img src={`${process.env.PUBLIC_URL}/images/menu_icon.svg`} alt="menu" />
    </HambergerMenu>
  )
};

const Search = styled.button`
  width: 3.6rem;
  height: 3.6rem;
  img{max-width: 100%;}
`;

export const BtnSearch = ({ onClick }) => {
  return (
    <Search type="submit" onClick={onClick}>
      <img src={`${process.env.PUBLIC_URL}/images/search_icon.svg`} alt="search" />
    </Search>
  )
};

const CardIcon = styled.button`
  width: 2rem;
  display: block;
  img{max-width: 100%;}
  &.player-add{
    &.save{
      img{
        &.off{display: none;}
        &.on{display: block;}
      }
    }
    img{
      filter: ${({ theme }) => theme.onFilter};
      &.on{display: none;}
    }
  }
`;

export const BtnPlay = ({ className }) => {
  return (
    <CardIcon type="button" className={className}>
      <img src={`${process.env.PUBLIC_URL}/images/play_icon.png`} alt="play" />
    </CardIcon>
  )
};

export const BtnSave = ({ className, onClick }) => {
  return (
    <CardIcon type="button" className={className} onClick={onClick}>
      <img src={`${process.env.PUBLIC_URL}/images/save_icon.svg`} className="off" alt="save" />
      <img src={`${process.env.PUBLIC_URL}/images/save_add_icon.svg`} className="on" alt="save" />
    </CardIcon>
  )
};

const PlayBtns = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  button{
    width: 2rem;
    img{max-width: 100%;}
  }
`;

export const Controls = ({onClick, isPaused}) => {
  return (
    <PlayBtns>
      <button type="button">
        <img src={`${process.env.PUBLIC_URL}/images/prev_play_icon.png`} alt="Previous" />
      </button>
      <button type="button" className={isPaused ? 'paused':'playing'} onClick={onClick}>
        <img 
          src={`${process.env.PUBLIC_URL}/images/${isPaused ? 'pause':'play'}_icon.png`} 
          alt={isPaused ? 'pause':'play'}
        />
      </button>
      <button type="button">
        <img src={`${process.env.PUBLIC_URL}/images/next_play_icon.png`} alt="Next" />
      </button>
    </PlayBtns>
  )
};