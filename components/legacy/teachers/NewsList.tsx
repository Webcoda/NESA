import React, { Fragment } from 'react';
import { Paper } from '@material-ui/core';
import moment from 'moment';
import DateBox from './DateBox';

export interface EventListProps {
  /**
   * List of events to be displayed
   */
  events: {
    date: Date;
    label: string;
    url?: string;
  }[];

  /**
   * Maximum number of events to display. Defaults to 5.
   */
  limit?: number;

  className?: string;
}

/**
 * Displays list of upcoming events
 * @param props
 * @constructor
 */
const NewsList = (props: EventListProps): JSX.Element => {
  const { events, limit = 5, className = '' } = props;

  return (
    <Paper className={`event-list ${className}`} elevation={3}>
      <h3>News</h3>
      {events.length > 0 && (
        <div className="event-list__list">
          {events.slice(0, limit).map((e, index) => {
            const d = moment(e.date);
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={index}>
                <span className={`event-list__day grid-row-${index + 1} grid-col-1`}>
                  {d.format('ddd')}
                </span>
                <div className={`event-list__date grid-row-${index + 1} grid-col-2`}>
                  <DateBox date={e.date} />
                </div>
                <a
                  href={e.url}
                  aria-label={e.label}
                  target="_blank"
                  rel="noreferrer"
                  className={`event-list__label no-icon grid-row-${index + 1} grid-col-3`}
                >
                  {e.label} <i className="fas fa-external-link-alt" />
                </a>
              </Fragment>
            );
          })}
        </div>
      )}
      <div className="event-list__view-all">
        <a
          href="https://educationstandards.nsw.edu.au/wps/portal/nesa/about/news/media-releases"
          aria-label="View all news"
          target="_blank"
          rel="noreferrer"
          className="no-icon"
        >
          View all <i className="fas fa-external-link-alt" />
        </a>
      </div>
      {events.length === 0 && <p>There are currently no upcoming events</p>}
    </Paper>
  );
};

export default NewsList;
