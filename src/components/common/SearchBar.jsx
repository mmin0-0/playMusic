import styled from 'styled-components';
import { BtnSearch } from './Buttons/Btns.jsx';
import { useState } from 'react';

const SearchInp = styled.div`
  position: relative;
  margin-bottom: 2rem;
  input{
    width: 100%;
    color: ${({ theme }) => theme.white};
    padding: 1.6rem;
    border-radius: 3rem;
    border: 1px solid ${({ theme }) => theme.darkgrey};
    background: ${({ theme }) => theme.darkgrey};
    &:focus{border-color: ${({ theme }) => theme.mainColor};}
  }
  button{
    position: absolute;
    top: 50%;
    right: 1.6rem;
    transform: translateY(-50%);
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
      <BtnSearch onClick={handleSearch} />
    </SearchInp>
  )
};