import React, { useState } from 'react';
import { Header, SearchForm, SearchFormBtn, Input } from './Searchbar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [newQuery, setNewQuery] = useState('');

  const onSubmitBtn = e => {
    e.preventDefault();
    onSubmit(newQuery);
    if (newQuery.trim() === '') {
      alert('Введіть значення для пошуку');
      return;
    }
    setNewQuery('');
  };

  const onChangeInput = e => {
    setNewQuery(e.target.value);
  };

    return (
      <Header className="searchbar">
        <SearchForm className="form" onSubmit={onSubmitBtn}>
          <SearchFormBtn type="submit" className="button">
            <span className="button-label">Search</span>
          </SearchFormBtn>

          <Input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={newQuery}
            onChange={onChangeInput}
          />
        </SearchForm>
      </Header>
    );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,  
}