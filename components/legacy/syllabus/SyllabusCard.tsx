import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent } from '@material-ui/core';
import { UrlLink } from '../../utilities/frontendTypes';
import { Stages } from '../../store/mock/stages';

export interface SyllabusCardProps {
  /**
   * Headline text of the card.
   */
  headline: string;

  /**
   * Main text of the card
   */
  body?: string;

  /**
   * The Url to link to when the card is clicked
   */
  url: UrlLink;

  /**
   * Marks the card with a coloured top border
   */
  colour?: 'primary' | 'secondary';

  className?: string;
}

/**
 * A clickable Card that displays a single syllabus item
 * @param props
 * @constructor
 */
const SyllabusCard = (props: SyllabusCardProps): JSX.Element => {
  const { headline, body, url, colour, className } = props;

  let shouldBeDisabled = false;

  // This a MVP requirement https://bostes.atlassian.net/browse/DC-146
  switch (url.url) {
    case `/stages/primary/${Stages.stage2.id}`:
      url.external = true;
      url.url = 'https://educationstandards.nsw.edu.au/wps/portal/nesa/k-10/years/stage-2';
      break;
    case `/stages/primary/${Stages.stage3.id}`:
      url.external = true;
      url.url = 'https://educationstandards.nsw.edu.au/wps/portal/nesa/k-10/years/stage-3';
      break;
    case `/stages/secondary/${Stages.stage4.id}`:
      url.external = true;
      url.url = 'https://educationstandards.nsw.edu.au/wps/portal/nesa/k-10/years/stage-4';
      break;
    case `/stages/secondary/${Stages.stage5.id}`:
      url.external = true;
      url.url = 'https://educationstandards.nsw.edu.au/wps/portal/nesa/k-10/years/stage-5';
      break;
    case `/stages/senior/${Stages.stage6.id}`:
      shouldBeDisabled = true;
      break;
    default:
      break;
  }

  return shouldBeDisabled ? (
    <Card
      className={`syllabus-card ${colour ? `syllabus-card--${colour}` : ''} ${
        className || ''
      } section-card-disabled `}
    >
      <div className="syllabus-card section-card-disabled">
        <div className="syllabus-card__content">
          <div className="syllabus-card__content-wrapper">
            <h2 className="syllabus-card__headline">{headline}</h2>
            {body && <p className="syllabus-card__body">{body}</p>}
          </div>
          <span className="syllabus-card__link">
            <i className="material-icons nsw-material-icons">east</i>
          </span>
        </div>
      </div>
    </Card>
  ) : (
    <Card
      className={`syllabus-card ${colour ? `syllabus-card--${colour}` : ''} ${className || ''}`}
    >
      <CardActionArea
        component={url.external ? 'a' : Link}
        {...(url.external ? { href: url.url, target: '__blank' } : { to: url.url })}
        className="syllabus-card"
      >
        <CardContent className="syllabus-card__content">
          <div className="syllabus-card__content-wrapper">
            <h2 className="syllabus-card__headline">
              {headline}
              {url.external && (
                <>
                  {' '}
                  <i className="fas fa-external-link-alt" />
                </>
              )}
            </h2>
            {body && <p className="syllabus-card__body">{body}</p>}
          </div>
          <span className="syllabus-card__link">
            <i className="material-icons nsw-material-icons">east</i>
          </span>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SyllabusCard;
