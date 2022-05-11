import React from 'react';
import { Paper } from '@material-ui/core';
import DateBox from './DateBox';

interface Notice {
  /**
   * The date the notice was posted
   */
  postedDate: Date;

  /**
   * The notice message
   */
  content: string;

  /**
   * The notice URL
   */
  url?: string;

  /**
   * Whether to flag the notice as important
   */
  flag?: boolean;
}

export interface NoticeListProps {
  /**
   * Notices to display
   */
  notices: Notice[];

  /**
   * Maximum number of notices to display. Defaults to 5.
   */
  limit?: number;

  className?: string;
}

/**
 * Displays a list of current notices.
 * @param props
 * @constructor
 */
const NoticeList = (props: NoticeListProps): JSX.Element => {
  const { notices, limit = 5, className = '' } = props;

  return (
    <Paper className={`notice-list ${className}`} elevation={3}>
      <h3>Official Notices</h3>
      {notices.length > 0 && (
        <div className="notice-list__list">
          {notices.slice(0, limit).map((notice, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="notice">
              <a
                href={notice.url}
                aria-label={notice.content}
                target="_blank"
                rel="noreferrer"
                className="no-icon"
              >
                <div>
                  <DateBox date={notice.postedDate} />
                  <p className="notice__content">
                    {notice.content} <i className="fas fa-external-link-alt" />
                  </p>
                </div>
              </a>
            </div>
          ))}
          <div className="notice-list__view-all">
            <a
              href="https://educationstandards.nsw.edu.au/wps/portal/nesa/about/news/official-notices"
              aria-label="Official Notices"
              target="_blank"
              rel="noreferrer"
              className="no-icon"
            >
              View all <i className="fas fa-external-link-alt" />
            </a>
          </div>
        </div>
      )}

      {notices.length === 0 && <p>There are currently no notices</p>}
    </Paper>
  );
};

export default NoticeList;
