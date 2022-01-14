import { MdSearch } from 'react-icons/md';

function SearchBar() {
  return (
    <div className='search'>
      <input type='text' />
      <MdSearch className='icon' />
    </div>
  );
}

export default SearchBar;
