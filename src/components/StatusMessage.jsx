import styled, {keyframes} from 'styled-components';
import { Strong, P } from './Text';
import { spacing, flexBox, size } from '../styles/utils';

const loading = keyframes`
  0 {transform: translate(0, 0);}
  50% {transform: translate(0, 15px);}
  100% {transform: translate(0, 0);}
`;

const LoadingWrap = styled.div`
  .load-wrap{
  ${spacing.mt(1)};
  ${flexBox('row', 'flex-start', 'center', '', '.8rem')};
    .line{
    ${size('1.2rem', '1.2rem')};
      border-radius: 50%;
      background: ${({theme}) => theme.colors.mainColor};
      animation: ${loading} .6s linear infinite;
      &:first-child{animation-delay: .1s;}
      &:nth-child(2){animation-delay: .2s;}
      &:last-child{animation-delay: .3s;}
    }
  }
`;

export const Loading = () => {
  return (
    <LoadingWrap className="loading">
      <Strong fontSize="1.8rem">Loading ...</Strong>
      <div className="load-wrap">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </LoadingWrap>
  )
};

const EmptyWrap = styled.div`p{${spacing.mt(2)}}`;

export const Empty = ({error, title}) => {
  return (
    <EmptyWrap>
      <Strong fontSize="1.8rem">{title}</Strong>
      <P>Error: {error}</P>
    </EmptyWrap>
  )
};
