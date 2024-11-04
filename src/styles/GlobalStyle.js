import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset';
import media from './media.js';

const GlobalStyle = createGlobalStyle`
  ${reset};

  * {
    box-sizing: border-box;
  }
  html {
    font-size: 10px;
    scroll-behavior: smooth;
  }
  body {
    font-size: 1.6rem;
    line-height: 1;
    word-break: keep-all;
    letter-spacing: -0.02em;
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 400;
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: .2rem;
    border: 3px solid ${({ theme }) => theme.colors.darkgrey};
    background: ${({ theme }) => theme.colors.mainColor};
    &:hover {
      background: #0E8561;
    }
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.darkgrey};
  }

  input, textarea {
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
  }
  input:focus {
    outline: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }

  .hide {
    position: absolute;
    width: 1px!important;
    height: 1px!important;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    border: 0;
    clip-path: polygon(0 0, 0 0, 0 0);
  }

  .img-wrap {
    img {
      max-width: 100%;
    }
  }

  #wrap {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    height: 100vh;
    display: flex;
    > button {
      display: none;
      position: absolute;
      top: 1rem;
      left: 1rem;
      img {
        max-width: 100%;
      }
      ${media.lg`display: block;`}
    }
    .container {
      width: 100%;
      margin-left: 14rem;
      padding: 2rem 4rem 18rem;
      overflow: auto;
      ${media.lg`
        margin-left: 0;
        padding: 4rem 2rem 14rem 5rem;
      `}
      section {
        .cont-wrap {
          margin-top: 2.6rem;
          padding-top: 2.6rem;
          border-top: 1px solid ${({ theme }) => theme.colors.darkgrey};
        }
      }
    }
  }
`;

export default GlobalStyle;
