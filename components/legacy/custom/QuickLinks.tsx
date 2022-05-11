import React from 'react';

export interface IQuickLink {
  id: string;
  name: string;
  tag?: string;
  children?: IQuickLink[];
}

export const inChildren = (id: IQuickLink['id'], link: IQuickLink): boolean =>
  link.id === id || (link.children?.some((c) => inChildren(id, c)) ?? false);

export const getLinkLeaves = (links: IQuickLink[]): IQuickLink[] =>
  links.flatMap((l) => {
    if (l.children?.length) {
      return getLinkLeaves(l.children);
    }
    return [l];
  });

interface LinkItemProps {
  link: IQuickLink;
  activeLink: IQuickLink['id'];
  depth?: number;
  parentActive?: boolean;
  onClick: (link: IQuickLink) => void;
}

const LinkItem = (props: LinkItemProps) => {
  const { link, depth = 0, activeLink, parentActive, onClick } = props;

  const classes = ['quick-links__list-link'];
  classes.push(`quick-links__list-link--depth-${depth}`);

  const isActive = inChildren(activeLink, link);

  if (isActive) {
    classes.push('quick-links__list-link--active');
  } else if (parentActive) {
    classes.push('quick-links__list-link--parent-active');
  }

  return (
    <>
      <li>
        <div
          className={classes.join(' ')}
          onClick={() => onClick(link)}
          onKeyPress={() => onClick(link)}
          tabIndex={0}
          role="button"
        >
          <h5>{link.name}</h5>
        </div>
      </li>
      {link.children?.map((child) => (
        <LinkItem
          link={child}
          depth={depth + 1}
          activeLink={activeLink}
          parentActive={isActive || parentActive}
          onClick={onClick}
        />
      ))}
    </>
  );
};

interface QuickLinksProps {
  /**
   * List of quick links
   */
  links: IQuickLink[];

  /**
   * Currently Active link
   */
  activeLink: LinkItemProps['activeLink'];

  /**
   * Function to be used on the links are clicked
   */
  handleLinkClick: (quickLink: IQuickLink) => void;
}

const QuickLinks = (props: QuickLinksProps) => {
  const { links, activeLink, handleLinkClick } = props;

  return (
    <div className="quick-links">
      <p className="quick-links__heading">Quick Links</p>
      <ul className="quick-links__list">
        {links.map((link) => (
          <LinkItem key={link.id} link={link} activeLink={activeLink} onClick={handleLinkClick} />
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;
