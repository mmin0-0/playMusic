import styled from 'styled-components';
import { Image } from "../components/Image";
import { Strong, P } from "../components/Text";
import { size, spacing, flexBox } from '../styles/utils';

const Empty = styled.div`
  ${size('100%', 'calc(100vh - 18rem)')};
  ${flexBox('column', 'center', 'center', '', '2rem')};
`;
const EmptyIcon = styled.div`
  ${size('20rem', undefined)};
  > img{max-width: 100%;}
`;
const EmptyInfo = styled.div`
  text-align: center;
  > p{${spacing.mt(2)}}
`;

export default function Error(){
  return(
    <section id="empty">
      <Empty>
        <EmptyIcon>
          <Image src="empty_icon.svg" alt="404 Error" />
        </EmptyIcon>
        <EmptyInfo>
          <Strong>페이지를 찾을 수 없습니다.</Strong>
          <P lineHeight="1.4">
          페이지가 존재하지 않거나 사용할 수 없는 페이지입니다. <br className="d-pc" />
          주소가 올바른지 확인하시거나 메인으로 이동해 주세요.
          </P>
        </EmptyInfo>
      </Empty>
    </section>
  )
}