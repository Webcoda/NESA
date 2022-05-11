import React from 'react';
import { Link } from 'react-router-dom';
import { LinkedIn, Twitter, YouTube } from '@material-ui/icons';
import { UrlLink } from '../../utilities/frontendTypes';
import { Sections } from '../../constants/pathConstants';
import Flickr from '../../assets/images/flickr.svg';
import useNavGroups, {
  NavGroup,
  NavGroupSection,
  useRowCount,
} from '../../utilities/hooks/useNavGroups';
import SanitisedHTMLContainer from '../base/SanitisedHTMLContainer';

type LinkColumn = UrlLink[];

interface SectionProps {
  /**
   * The list of links to be displayed, sorted into columns
   */
  sections: NavGroupSection[];
}

const FooterGroup = (props: SectionProps) => {
  const { sections } = props;

  return (
    <div className="nav-footer-group">
      {sections.map((section) => {
        const rowCount = useRowCount(section.links.length);

        const columns = section.links.reduce<UrlLink[][]>((acc, val) => {
          let column = acc[acc.length - 1];
          if (!column) {
            column = [];
            acc.push(column);
          } else if (column.length === rowCount) {
            column = [];
            acc.push(column);
          }

          column.push(val);
          return acc;
        }, []);

        return (
          <div className="nav-footer-group__section" key={section.label}>
            <p className="nav-footer-group__section-header">{section.label}</p>
            <div className="nav-footer-group__section-body">
              {columns.map((c) => (
                <ul className="nav-footer-group__section-column" key={c[0].url}>
                  {c.map((link) => (
                    <li className="nav-footer-group__section-link" key={link.title}>
                      <Link to={link.url}>
                        {link.icon || null}
                        <SanitisedHTMLContainer>{link.title}</SanitisedHTMLContainer>
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export interface NavFooterProps {
  /**
   * Sections to be displayed in the footer
   */
  groups: NavGroup[];
}

/**
 * Navigation footer with links to all of the pages grouped by section
 * @param props
 * @constructor
 */
export const PureNavFooter = (props: NavFooterProps): JSX.Element => {
  const { groups } = props;

  return (
    <footer className="nav-footer nsw-container">
      <div className="nav-footer__nesa">
        <p className="nav-footer__nesa-header">NESA</p>
        <p>
          <a
            href="https://educationstandards.nsw.edu.au/wps/portal/nesa/mini-footer/copyright"
            aria-label="Copyright"
            target="_blank"
            rel="noreferrer"
          >
            &copy; 2021
          </a>
        </p>
        <p>
          <a
            href="https://www.educationstandards.nsw.edu.au/wps/portal/nesa/mini-footer/privacy"
            aria-label="Privacy"
            target="_blank"
            rel="noreferrer"
          >
            Privacy
          </a>
        </p>
        <div className="nav-footer__icons">
          <a
            href="https://twitter.com/NewsAtNesa"
            aria-label="Twitter"
            target="_blank"
            rel="noreferrer"
            className="no-icon"
          >
            <Twitter />
          </a>
          <a
            href="https://www.linkedin.com/company/nsw-education-standards-authority?trk=top_nav_home"
            aria-label="LinkedIn"
            target="_blank"
            rel="noreferrer"
            className="no-icon"
          >
            <LinkedIn />
          </a>
          <a
            href="https://www.youtube.com/user/BoardOfStudiesNSW"
            aria-label="YouTube"
            target="_blank"
            rel="noreferrer"
            className="no-icon"
          >
            <YouTube />
          </a>
          <a
            href="https://www.flickr.com/photos/128432248@N02/"
            aria-label="Flickr"
            target="_blank"
            rel="noreferrer"
            className="no-icon"
          >
            <img src={Flickr} alt="Flickr logo" />
          </a>
        </div>
      </div>
      <div className="nav-footer__sections">
        {groups
          .filter((g) => g.sections)
          .map((g) => (
            <FooterGroup key={g.id} sections={g.sections!} />
          ))}
      </div>
    </footer>
  );
};

/**
 * Navigation footer with links to all of the pages grouped by section
 * @param props
 * @constructor
 */
export default () => {
  const navGroups = useNavGroups(true);

  return <PureNavFooter groups={navGroups} />;
};
