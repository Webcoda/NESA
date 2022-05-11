import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Paper, Popover } from '@material-ui/core';
import logo from '../../assets/images/nsw-gov-logo-75-high.svg';
import SearchBar from '../base/SearchBar';
import NavBarMenu from './NavBarMenu';
import useFocusTabIndex from '../../utilities/hooks/useFocusTabIndex';
import useNavGroups, { NavGroup, NavGroupSection } from '../../utilities/hooks/useNavGroups';
import PATHS from '../../constants/pathConstants';

/**
 * A header navigation bar
 * @param props
 * @constructor
 */
export const PureNavBar = (props) => {
  const { destinations, search, onSearchOpen, hideSearchBar, onSearchSubmit, className } = props;
  const [hoverLink, setHoverLink] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);
  const [menuContent, setMenuContent] = useState([]);
  const location = useLocation();
  const [currentNavId, setCurrentNavId] = useState(
    destinations?.length > 0 ? destinations[0].id : '',
  );

  const handleHoverLinkStart = (e, link) => {
    if (link && link.sections) {
      setPopoverAnchor(e.currentTarget);
      setMenuContent(link.sections);
      setHoverLink(true);
      setCurrentNavId(link.id);
    }
  };

  const handleHoverPopoverStart = () => {
    setHoverLink(true);
  };

  const handleHoverPopoverEnd = () => {
    setHoverLink(false);
  };

  const handleLinkClick = () => {
    setHoverLink(false);
  };

  /**
   * Set focus to current Nav button when popover closed
   * Ignore focus on first render
   */
  if (currentNavId) {
    const currentNavButton = document.getElementById(`${currentNavId}-nav`);
    useFocusTabIndex(hoverLink, currentNavButton);
  }

  return (
    <header className={`navbar ${className || ''} column`}>
      <NavLink to={PATHS.HOME}>
        <div className="navbar__title-container">
          <img className="navbar__logo" src={logo} alt="NSW Government Logo" />
          <div className="column">
            <h1 className="navbar__title">NSW Curriculum</h1>
            <h2 className="navbar__sub-title">NSW Education Standards Authority</h2>
          </div>
        </div>
      </NavLink>

      <div className="row">
        {!search && (
          <>
            <nav className="nav-links">
              {destinations.map((link) => {
                if (link.sections) {
                  return (
                    <button
                      key={link.id}
                      type="button"
                      tabIndex={0}
                      id={`${link.id}-nav`}
                      className={`button button--transparent button--text-align-center
                      ${
                        location.pathname.includes(link.url)
                          ? 'nav-links__link active'
                          : 'nav-links__link'
                      }
                    `}
                      onClick={(e) => handleHoverLinkStart(e, link)}
                      onMouseEnter={(e) => handleHoverLinkStart(e, link)}
                      onMouseLeave={handleHoverPopoverEnd}
                    >
                      <span className="nav-links__link-text">{link.label}</span>
                      {link.icon && <span className="nav-links__link-icon">{link.icon}</span>}
                    </button>
                  );
                }
                return (
                  <NavLink key={link.id} className="nav-links__link" to={link.url}>
                    <span className="nav-links__link-text">{link.label}</span>
                    {link.icon && <span className="nav-links__link-icon">{link.icon}</span>}
                  </NavLink>
                );
              })}
            </nav>
            {/* TODO remove after MVP */}
            {/* <button className="navbar__search" type="button" onClick={onSearchOpen}> */}
            {/*  <Search className="navbar__search-icon" /> */}
            {/*  <span className="navbar__search-text">Search</span> */}
            {/* </button> */}
          </>
        )}
        {search && (
          <Paper className="navbar__search-container" elevation={2}>
            <SearchBar onSearch={onSearchSubmit} onBlurEvent={hideSearchBar} autoFocus />
          </Paper>
        )}
      </div>
      <Popover
        className="navbar__menu-container"
        open={hoverLink}
        anchorEl={popoverAnchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handleHoverPopoverEnd}
        disableRestoreFocus
        PaperProps={{
          onMouseEnter: handleHoverPopoverStart,
          onMouseLeave: handleHoverPopoverEnd,
        }}
      >
        <NavBarMenu sections={menuContent} onLinkClick={handleLinkClick} />
      </Popover>
    </header>
  );
};

export default (props) => {
  const destinations = useNavGroups();

  return <PureNavBar {...props} destinations={destinations} />;
};
