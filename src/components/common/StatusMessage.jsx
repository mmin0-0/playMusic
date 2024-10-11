import styled, {keyframes} from 'styled-components';

const loading = keyframes`
  0 {transform: translate(0, 0);}
  50% {transform: translate(0, 15px);}
  100% {transform: translate(0, 0);}
`;

const LoadingWrap = styled.div`
  strong{
    font-size: 1.8rem;
    font-weight: 600;
  }
  .load-wrap{
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: .8rem;
    .line{
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      background: ${({theme}) => theme.mainColor};
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
      <strong>Loading ...</strong>
      <div className="load-wrap">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </LoadingWrap>
  )
};

const EmptyWrap = styled.div`
  strong{
    font-size: 1.8rem;
    font-weight: 600;
  }
  p{
    display: block;
    margin-top: 2rem;
  }
`;

export const Empty = ({error, title}) => {
  return (
    <EmptyWrap className="empty">
      <strong>{title}</strong>
      <p>Error: {error}</p>
    </EmptyWrap>
  )
};
