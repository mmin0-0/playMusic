import styled from 'styled-components';
import { DefaultBtn } from './Button.jsx';
import { Image } from './Image.jsx';
import { useState } from 'react';
import { position, spacing, blank, size, border } from '../styles/utils.js';

const SearchInp = styled.div`
  ${position('relative')};
  ${spacing.mb(2)};
  input{
    ${size('100%', undefined)};
    ${blank.pc(1.6)};
    ${border('1px', 'solid', ({theme}) => theme.colors.darkgrey)};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 3rem;
    background: ${({ theme }) => theme.colors.darkgrey};
    &:focus{border-color: ${({ theme }) => theme.colors.mainColor};}
  }
  button{
    ${position('absolute', {top: '50%', right: '1.6rem'}, 'translateY(-50%)')};
  }
`;

export const SearchBar = ({onChange, searchPlaylists}) => {
  const [query, setQuery] = useState('');
  const handleSearch = () => {
    searchPlaylists(query);
  };

  return (
    <SearchInp className="input-wrap">
      <input
        type="text"
        value={query}
        onChange={(e)=>{setQuery(e.target.value)}}
        placeholder="검색어를 입력해주세요."
      />
      <DefaultBtn onClick={handleSearch} size="large">
        <Image src="search_icon.svg" alt="search" />
      </DefaultBtn>
    </SearchInp>
  )
};