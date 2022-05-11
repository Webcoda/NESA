import React from 'react';
import { Card } from 'nsw-ds-react';

export interface LinkCardProps {
  headline: string;
  link: string;
  className?: string;
}

const LinkCard = (props: LinkCardProps): JSX.Element => {
  const { headline, link, className = '' } = props;

  return (
    <Card
      headline={
        <>
          {headline}
          <i className="fas fa-external-link-alt" />
        </>
      }
      highlight
      link={link}
      className={className}
    />
  );
};

export default LinkCard;
