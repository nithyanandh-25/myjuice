import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css'
// SearchBar component
const SearchBar = ({ query, handleChange, handleSubmit }) => (
    <form onSubmit={handleSubmit} className='search-bar'>
      <button type="submit">
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <input
        type="text"
        placeholder="Search for liquid's..."
        value={query}
        onChange={handleChange}
      />
    </form>
  );

  export default SearchBar;