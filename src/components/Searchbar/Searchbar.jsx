import { useState } from 'react';
import PropTypes from 'prop-types';
import { Header, SearchForm, Input, ButtonSubmit } from './Searchbar.styled';
import { toast } from 'react-toastify';

export const SearchBar = ({ showPictures }) => {
  const [query, setQuery] = useState('');

  const searchQueryChange = e => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

   

    if (query.trim() === '') {
      toast.error('Please enter a search value');
      return;
    }

    showPictures(query);
    setQuery('');
  };
    
    

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <ButtonSubmit type="submit">
          <span>Search</span>
        </ButtonSubmit>

        <Input
          onChange={searchQueryChange}
          value={query}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

SearchBar.propTypes = { showPictures: PropTypes.func.isRequired };
