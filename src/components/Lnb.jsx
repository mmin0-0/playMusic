import { Link as ReactRouterDomLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import media from '../styles/media.js';
import { DefaultBtn } from './Button.jsx';
import { Image, ImgWrap } from './Image.jsx';
import { spacing, blank, flexBox, border } from '../styles/utils.js';
import { Span } from './Text';

const LnbWrap = styled.div`
  width: 12rem;
  height: calc(100vh - 4rem);
  border-radius: 2rem;
  position: fixed;
  left: 2rem;
  top: 50%;
  z-index: 10;
  transform: translateY(-50%);
  ${blank.py(4,4)};
  ${blank.px(2,2)};
  background: ${({ theme }) => theme.colors.black};
  ${border('1px', 'solid',({ theme }) => theme.colors.mainColor)};
  ${media.lg`
    height: 100vh;
    left: -12rem;
    top: 0;
    transform: translateY(0);
    padding: 6rem 2rem;
    border: 0;
    border-radius: 0;
    transition: left .35s;
    &.on{
      left: 0;
      z-index: 10;
    }
  `}
  > button{
    position: absolute;
    top: 1.2rem;
    right: 1rem;
    display: none;
    ${media.lg`display: block;`}
  }
  .logo{
    text-align: center;
    a{
      width: 100%;
      height: 100%;
    }
    .img-wrap{
      width: 4rem;
      height: 4rem;
      ${spacing.ma};
      ${spacing.mb(1.2)};
      ${flexBox('row','center','center', '','')}
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.mainColor};
      img{width: 70%;}
    }
  }
`;

const NavWrap = styled.nav`
  ${spacing.mt(8)};
  a{&:not(:first-child){${spacing.mt(4)}}}
`;

const Link = ({ isActive, children, ...props }) => {
  return <ReactRouterDomLink {...props}>{children}</ReactRouterDomLink>;
};

const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  transition: all .25s;
  opacity: ${(props) => (props.isActive ? 1 : .45)};
  &:hover{
    opacity: 1;
    .icon{filter: ${({theme}) => theme.colors.onFilter};}
  }
  .icon{
    width: 2.8rem;
    height: 2.8rem;
    display: block;
    ${spacing.ma};
    ${spacing.mb(1.2)};
    filter: ${(props) => (props.isActive ? ({theme}) => theme.colors.onFilter : 'none')};
    ${media.sm`${spacing.mb(.6)}  `}
  }
  span{
    ${media.sm`
      font-weight: ${({theme}) => theme.fontWeight.medium};
      font-size: ${({theme}) => theme.fontSize.xs};  
    `}
  }
`;

function Lnb({lnbActive, toggleLnb}) {
  const { pathname } = useLocation();
  const lnbMenu = [
    { name: '마이플레이', tit: 'play', path: '/playlist' },
    { name: '검색', tit: 'search', path: '/search' }
  ];

  return (
    <>
      <LnbWrap id="lnb" className={lnbActive ? 'on' : ''}>
        <DefaultBtn onClick={toggleLnb}>
          <Image src="closed_icon.png" alt="closed" />
        </DefaultBtn>
        <div className="logo">
          <Link to="/">
            <ImgWrap src="headset_icon.svg" alt="today music" />
            <Span>Today music</Span>
          </Link>
        </div>
        <NavWrap>
          {
            lnbMenu.map((item) => (
              <StyledLink to={item.path} key={item.path} isActive={pathname === item.path}>
                <Image src={`lnb_${item.tit}_icon.svg`} alt={item.tit} className="icon" />
                <Span>{item.name}</Span>
              </StyledLink>
            ))
          }
        </NavWrap>
      </LnbWrap>
    </>
  )
}
export default Lnb;