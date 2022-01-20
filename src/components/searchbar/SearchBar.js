import { MdSearch } from 'react-icons/md';

function SearchBar({ value, onChange }) {
  return (
    <div className='search'>
      <input
        type='text'
        value={value}
        onChange={onChange}
        placeholder={'Search a name...'}
      />
      <MdSearch className='icon' />
    </div>
  );
}

export default SearchBar;
