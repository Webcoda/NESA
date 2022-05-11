import React from 'react';
import { CardMedia } from '@material-ui/core';
import ResourcesCard from './ResourcesCard';
import { formatDate } from '../../utilities/functions';

export interface IntroductionVideoCardProps {
  thumbnail?: string;
  video?: string;
  label: string;
  date: Date;
  title: string;
  description?: string;
  transcriptFile: string;
  onCardClick?: (video: string, label: string) => void;
}

const IntroductionVideoCard = (props: IntroductionVideoCardProps): JSX.Element => {
  const { thumbnail, video, label, date, title, description, onCardClick, transcriptFile } = props;

  return (
    <div>
      <div
        className="intro-video-card"
        onClick={onCardClick && video ? () => onCardClick(video, label) : () => {}}
        onKeyPress={onCardClick && video ? () => onCardClick(video, label) : () => {}}
        role="button"
        tabIndex={0}
      >
        <ResourcesCard media={<CardMedia component="img" src={thumbnail} alt={`Thumbnail for ${label} video`} className="intro-video-card__thumbnail" />} colour="primary">
          <p className="intro-video-card__label">{label}</p>
          <p className="intro-video-card__date">{formatDate(date)}</p>
          <p className="intro-video-card__title">{title}</p>
          <a
            className="intro-video-card__download-transcript"
            onClick={(event) => { event.stopPropagation(); }}
            href={transcriptFile}
          >
            Download transcript
          </a>
          {description && <p className="intro-video-card__description">{description}</p>}
        </ResourcesCard>
      </div>
    </div>
  );
};

export default IntroductionVideoCard;
