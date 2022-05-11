import { Paper, Popover } from '@material-ui/core';
import Link from "next/link";
import { useState } from 'react';
import logo from '../assets/images/nsw-gov-logo-75-high.svg';
// import SearchBar from '../base/SearchBar';
// import PATHS from '../constants/pathConstants';
// import useFocusTabIndex from '../utilities/hooks/useFocusTabIndex';
// import useNavGroups from '../utilities/hooks/useNavGroups';
// import NavBarMenu from './NavBarMenu';

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
      <Link to={PATHS.HOME}>
        <div className="navbar__title-container">
          <img className="navbar__logo" src={logo} alt="NSW Government Logo" />
          <div className="column">
            <h1 className="navbar__title">NSW Curriculum</h1>
            <h2 className="navbar__sub-title">NSW Education Standards Authority</h2>
          </div>
        </div>
      </Link>

      
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
        {/* <NavBarMenu sections={menuContent} onLinkClick={handleLinkClick} /> */}
      </Popover>
    </header>
  );
};

export default (props) => {
  const destinations = useNavGroups();

  return <PureNavBar {...props} destinations={destinations} />;
};
