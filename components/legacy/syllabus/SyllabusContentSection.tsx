import React from 'react';
import DOMPurify from 'dompurify';

export interface SyllabusContentSectionProps {
  innerHtml: string;
}

const SyllabusContentSection = (props: SyllabusContentSectionProps): JSX.Element => {
  const { innerHtml } = props;

  return (
    <div
      className="syllabus-content-section cms-content-formatting"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(innerHtml) }}
    />
  );
};

export default SyllabusContentSection;
