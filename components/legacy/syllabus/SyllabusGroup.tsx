import React, { ReactNode } from 'react';
import SyllabusCard, { SyllabusCardProps } from './SyllabusCard';

export interface SyllabusGroupProps {
  heading?: ReactNode;
  items: Pick<SyllabusCardProps, 'headline' | 'body' | 'url'>[];
  colour: SyllabusCardProps['colour'];
}

const SyllabusGroup = (props: SyllabusGroupProps): JSX.Element => {
  const { heading, items, colour } = props;

  return (
    <div className="syllabus-group">
      {typeof heading === 'string' && <h2 className="syllabus-group__heading">{heading}</h2>}
      {typeof heading !== 'string' && heading}
      <div className="syllabus-group__card-grid">
        {items.map((s, index) => (
          <SyllabusCard
            // eslint-disable-next-line react/no-array-index-key
            key={`syllabusCard-${index}`}
            className="syllabus-group__card"
            colour={colour}
            {...s}
          />
        ))}
      </div>
    </div>
  );
};

export default SyllabusGroup;
