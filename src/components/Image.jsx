import styled from 'styled-components';

export const Image = ({src, alt, className}) => {
  return <img src={`${process.env.PUBLIC_URL}/images/${src}`} alt={alt} className={className} />
};


const ImgWrapStyle = styled.div`
  > img{max-width: 100%;}
`;

export const ImgWrap = ({src, alt}) => {
  <ImgWrapStyle>
    <Image src={src} alt={alt} />
  </ImgWrapStyle>
};