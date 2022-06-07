import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import {
	IconButton,
	InputAdornment,
	InputBase,
	TextField,
} from '@material-ui/core'
import { Search } from '@material-ui/icons'

const inputLabelProps = {
	shrink: true,
	ariaLabel: 'search',
}

const inputProps = {
	inputProps: {
		min: 1,
		max: 20,
		label: 'search',
	},
}

export interface SearchBarProps {
	/**
	 * Callback fired when search is submitted, either via pressing return or clicking the magnifying
	 * glass icon
	 * @param text the text being searched
	 */
	onSearch?: (text: string) => void

	/**
	 * Callback fired when needs to hide search bar
	 */
	onBlurEvent?: () => void

	/**
	 * Classname prop, forwarded to root element
	 */
	className?: string

	/**
	 * Autofocus prop, forwarded to input element.
	 */
	autoFocus?: boolean
}

/**
 * Input for dealing with text searching.
 * @param props
 * @constructor
 */
const SearchBar = (props: SearchBarProps): JSX.Element => {
	const { className, onSearch, onBlurEvent, autoFocus } = props

	const [searchText, setSearchText] = useState('')

	const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value)
	}

	const handleKeypress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (onSearch && e.key === 'Enter') {
			onSearch(searchText)
		}
	}

	const handleSearchPress = () => {
		if (onSearch) {
			onSearch(searchText)
		}
	}

	return (
		<InputBase
			className={`search-bar ${className || ''}`}
			placeholder="Search"
			type="search"
			value={searchText}
			autoFocus={autoFocus}
			onChange={handleSearchTextChange}
			onKeyPress={handleKeypress}
			onBlur={onBlurEvent}
			inputProps={{ 'aria-label': 'search' }}
			startAdornment={
				<InputAdornment position="start">
					<IconButton
						onClick={handleSearchPress}
						className="search-bar__icon"
						aria-label="search"
					>
						<Search />
					</IconButton>
				</InputAdornment>
			}
		/>
	)
}

export default SearchBar
