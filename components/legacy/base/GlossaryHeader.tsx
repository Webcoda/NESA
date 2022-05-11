import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button, InputAdornment, OutlinedInput } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
import { alphabet, AlphabetChar } from '../../utilities/frontendTypes';

export interface GlossaryHeaderProps {
  /**
   * Which letter buttons should be disabled.
   */
  disabled?: AlphabetChar[];

  /**
   * The currently active letter button
   */
  selected?: AlphabetChar;

  /**
   * Called when a letter button is pressed
   * @param char The letter pressed
   */
  onSelect?: (char: AlphabetChar) => void;

  /**
   * The initial search term, mostly used for testing
   */
  startSearchTerm?: string;

  /**
   * Called when the search input is submitted
   * @param searchText the text being searched for
   */
  onSearch?: (searchText: string | null) => void;

  /**
   * Whether to hide explanation text or not
   */
  hideExplanationText?: boolean;
}

/**
 * Header component for the glossary, includes a search bar and buttons to filter by letter
 * @param props
 * @constructor
 */
const GlossaryHeader = (props: GlossaryHeaderProps): JSX.Element => {
  const {
    disabled,
    selected,
    onSelect,
    startSearchTerm = null,
    onSearch,
    hideExplanationText,
  } = props;

  const [searchText, setSearchText] = useState(startSearchTerm);
  const [clearSearch, setClearSearch] = useState(false);

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (e.target.value === '' && onSearch) onSearch(e.target.value);
  };

  const handleClearSearch = () => {
    if (onSearch) {
      onSearch('');
      setSearchText('');
      setClearSearch(false);
    }
  };

  const handleKeypress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onSearch && e.key === 'Enter') {
      setClearSearch(true);
      onSearch(searchText);
    }
  };

  const handleButtonClick = (char: AlphabetChar) => () => {
    if (onSelect) {
      onSelect(char);
    }
  };

  return (
    <div className="glossary-header">
      <OutlinedInput
        className="glossary-header__search"
        placeholder="Search for glossary terms"
        value={searchText ?? ''}
        onChange={handleSearchTextChange}
        onKeyPress={handleKeypress}
        inputProps={{ 'aria-label': 'search for glossary terms' }}
        startAdornment={
          <InputAdornment position="start">
            <Search className="search-bar__icon" />
          </InputAdornment>
        }
        endAdornment={clearSearch ?
          <InputAdornment position="end" onClick={handleClearSearch} className="search-bar__clear">
            <ClearIcon />
          </InputAdornment> : <></>}
      />
      <div className="glossary-header__alphabet-row">
        {alphabet.map((char) => (
          <Button
            className="glossary-header__alphabet-button"
            variant={selected === char ? 'contained' : 'outlined'}
            color="primary"
            disabled={disabled?.includes(char)}
            onClick={handleButtonClick(char)}
            key={char}
          >
            {char}
          </Button>
        ))}
      </div>
      {!hideExplanationText && (
        <p>
          The glossary draws on the NSW syllabus glossaries and the English glossary developed by
          the Australian Curriculum, Assessment and Reporting Authority.
        </p>
      )}
    </div>
  );
};

export default GlossaryHeader;
