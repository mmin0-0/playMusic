import { useEffect, useState } from "react";
import { Link as ReactRouterDomLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import media from '../../styles/media.js';
import { BtnClosed } from './Buttons/Btns.jsx'

const LnbWrap = styled.div`
  width: 12rem;
  height: calc(100vh - 4rem);
  border-radius: 2rem;
  position: fixed;
  left: 2rem;
  top: 50%;
  z-index: 10;
  transform: translateY(-50%);
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.black};
  border: 1px solid ${({ theme }) => theme.mainColor};
  ${media.lg`
    height: 100vh;
    left: -12rem;
    top: 0;
    transform: translateY(0);
    padding: 6rem 2rem;
    border: 0;
    border-radius: 0;
    transition: left .35s;
    &.on{left: 0;}
  `}
  .btn-closed{
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
      margin: 0 auto 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: ${({ theme }) => theme.mainColor};
      img{width: 70%;}
    }
    span{font-size: 1.4rem;}
  }
`;

const NavWrap = styled.nav`
  margin-top: 8rem;
  a{
    &:not(:first-child){margin-top: 4rem;}
  }
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
    .icon{filter: ${({theme}) => theme.onFilter};}
  }
  .icon{
    width: 2.8rem;
    height: 2.8rem;
    display: block;
    margin: 0 auto 1.2rem;
    filter: ${(props) => (props.isActive ? ({theme}) => theme.onFilter : 'none')};
    ${media.sm`margin: 0 auto .6rem;`}
  }
  span{
    font-size: 1.4rem;
    ${media.sm`
      font-weight: 500;
      font-size: 1.2rem;  
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
        <BtnClosed className="btn-closed" onClick={toggleLnb} />
        <div className="logo">
          <Link to="/">
            <div className="img-wrap">
              <img src={`${process.env.PUBLIC_URL}/images/headset_icon.svg`} alt="Logo" />
            </div>
            <span>Today music</span>
          </Link>
        </div>
        <NavWrap>
          {
            lnbMenu.map((item) => (
              <StyledLink to={item.path} key={item.path} isActive={pathname === item.path}>
                <img className="icon" src={`${process.env.PUBLIC_URL}/images/lnb_${item.tit}_icon.svg`} alt={`${item.tit}`} />
                <span>{item.name}</span>
              </StyledLink>
            ))
          }
        </NavWrap>
      </LnbWrap>
    </>
  )
}
export default Lnb;