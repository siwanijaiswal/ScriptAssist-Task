import { FC } from 'react';
import SearchIcon from '../../assets/search.png';

const Search: FC<{
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ onChangeHandler }) => {
  return (
    <div className="search-box">
      <img src={SearchIcon} width="18px" height="20px" />
      <input
        className="search-input"
        type="search"
        placeholder="Search Users"
        onChange={onChangeHandler}
      />
    </div>
  );
};
export default Search;
