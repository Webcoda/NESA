import React from 'react';
import { Paper } from '@material-ui/core';
import Chip from '../base/Chip';

export interface IText {
  title: string;
  author: string;
  isbn: number;
  publisher: string;
  year: number;
}

export interface PrescribedTextCardProps extends IText {
  courseDetails: string;
  accessibleOptions: string;
  prescribed: 'Prescribed' | 'Suggested';
  stage: string;
  learningArea: string;
  subject: string;
  type: string;
  className?: string;
  searchTags: string[];
}

const PrescribedTextCard = (props: PrescribedTextCardProps): JSX.Element => {
  const {
    title,
    author,
    isbn,
    publisher,
    year,
    courseDetails,
    accessibleOptions,
    prescribed,
    stage,
    learningArea,
    subject,
    type,
    className,
  } = props;

  return (
    <Paper className={`prescribed-texts-card ${className}`}>
      <div className="prescribed-texts-card__section">
        <h2 className="prescribed-texts-card__section-heading">{title}</h2>
        <p className="prescribed-texts-card__text-details">
          <span className="prescribed-texts-card__author">{author}</span>
          <span className="prescribed-texts-card__isbn">{isbn}</span>
          <span className="prescribed-texts-card__publisher">{publisher}</span>
          <span className="prescribed-texts-card__year">{year}</span>
        </p>
      </div>
      <div className="prescribed-texts-card__section">
        <h2 className="prescribed-texts-card__section-heading">Course Details</h2>
        <p>{courseDetails}</p>
      </div>
      <div className="prescribed-texts-card__section">
        <h2 className="prescribed-texts-card__section-heading">Accessible options</h2>
        <p>{accessibleOptions}</p>
      </div>
      <div className="prescribed-texts-card__section prescribed-texts-card__chip-section">
        <Chip text={prescribed} className="prescribed-texts-card__chip" />
        <Chip text={stage} className="prescribed-texts-card__chip" />
        <Chip text={subject} className="prescribed-texts-card__chip" />
        <Chip text={type} className="prescribed-texts-card__chip" />
      </div>
    </Paper>
  );
};

export default PrescribedTextCard;
