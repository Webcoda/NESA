import React, { HTMLProps } from 'react';
import DOMPurify from 'dompurify';

export interface SanitisedHTMLContainerProps extends HTMLProps<HTMLDivElement> {
  children: string;
}

const SanitisedHTMLContainer = ({
  children,
  ...others
}: SanitisedHTMLContainerProps): JSX.Element => {
  const sanitisedChildren = DOMPurify.sanitize(children, { ADD_ATTR: ['target'] });
  return (
    // eslint-disable-next-line react/no-danger
    <div {...others} dangerouslySetInnerHTML={{ __html: sanitisedChildren }} />
  );
};

export default SanitisedHTMLContainer;
