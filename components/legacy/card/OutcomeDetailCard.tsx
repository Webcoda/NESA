import React from 'react';
import { Paper } from '@material-ui/core';
import { IContentsGroup } from '../../utilities/backendTypes';
import SanitisedHTMLContainer from '../base/SanitisedHTMLContainer';
import { findTag } from '../../store/mock/tags';

export interface OutcomeDetailCardProps {
  /**
   * Card title
   */
  title?: string;

  /**
   * Syllabus Content
   */
  content: IContentsGroup[];

  /**
   * Syllabus Access Point
   */
  accessPoints?: IContentsGroup[];

  /**
   * Whether show the access point content
   */
  showAccessPoints?: boolean;
  /**
   * What tags to show.
   */
  showTags?: string[];
  /**
   * Whether show the examples
   */
  showExamples?: boolean;
  /**
   * Whether set default background color
   */
  defaultBackgroundColor?: boolean;
}

export default function OutcomeDetailCard(props: OutcomeDetailCardProps) {
  const {
    title,
    content,
    accessPoints,
    showAccessPoints,
    showTags,
    showExamples,
    defaultBackgroundColor,
  } = props;

  return (
    <Paper
      className={`outcome-detail-card nsw-p-sm nsw-p-bottom-lg ${
        defaultBackgroundColor ? 'outcome-detail-card--default-background' : ''
      }`}
    >
      {title && (
        <div className="content-organizer__outcome-title">
          <h1>{title}</h1>
          <hr />
        </div>
      )}
      <div className="outcome-detail-card__detail">
        {accessPoints && accessPoints.length > 0 && showAccessPoints && (
          <div className="filtered">
            <h2>Access content points</h2>
            <hr />
              {accessPoints.map((a) => (
                <div key={a.content_group}>
                  <span className="outcome-detail-card__subtitle">
                    <SanitisedHTMLContainer>{a.content_group}</SanitisedHTMLContainer>
                  </span>
                  <div>
                    {
                      a.rows.map((row) => (
                        <div key={row.description}>
                          <ul>
                            <li>
                              <SanitisedHTMLContainer>{row.description}</SanitisedHTMLContainer>
                            </li>
                          </ul>
                          {
                            row.example && showExamples &&
                            <span className="outcome-detail-card__example">
                              <SanitisedHTMLContainer>{row.example}</SanitisedHTMLContainer>
                            </span>
                          }
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))}
          </div>
        )}
        {content.map((group) => (
          <div key={group.content_group}>
            <h2>{group.content_group}</h2>
            <ul>
              {group.rows.map((row) => (
                <li key={row.description}>
                  <SanitisedHTMLContainer>{row.description}</SanitisedHTMLContainer>
                  {row.example && showExamples && (
                    <SanitisedHTMLContainer className="example">
                      {row.example}
                    </SanitisedHTMLContainer>
                  )}
                  {showTags && row.tags.length > 0 && (
                    <div className="tags">
                      {row.tags
                        .filter((t) => showTags.includes(t))
                        .map((tag) => <p className="tag">{findTag(tag).tag}</p>)}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Paper>
  );
}
