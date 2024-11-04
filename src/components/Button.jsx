import styled from 'styled-components';
import { Image } from './Image.jsx';

const buttonSizes = {
  small: `
    width: 2rem;
    height: 2rem;
  `,
  medium: `
    width: 3.2rem;
    height: 3.2rem;
  `,
  large: `
    width: 3.6rem;
    height: 3.6rem;
  `
};

const DefaultBtnStyle = styled.button`
  ${({size}) => buttonSizes[size] || buttonSizes.small};
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

export const DefaultBtn = ({className, onClick, type="button", size="small", children}) => {
  return <DefaultBtnStyle type={type} size={size} className={className} onClick={onClick}>{children}</DefaultBtnStyle>
};

const FixControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const Controls = ({onClick, isPaused}) => {
  return (
    <FixControls>
      <DefaultBtn>
        <Image src="prev_play_icon.png" alt="prev" />
      </DefaultBtn>
      <DefaultBtn onClick={onClick}>
        <Image src={`${isPaused ? 'pause':'play'}_icon.png`} alt={isPaused ? 'pause':'play'} />
      </DefaultBtn>
      <DefaultBtn>
        <Image src="next_play_icon.png" alt="next" />
      </DefaultBtn>
    </FixControls>
  )
};