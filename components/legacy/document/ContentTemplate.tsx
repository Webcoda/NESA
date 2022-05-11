import React, { Fragment } from 'react';
import { IContents, IContentsRow } from '../../utilities/backendTypes';
import SanitisedHTMLContainer from '../base/SanitisedHTMLContainer';
import { findTag } from '../../store/mock/tags';

interface ContentGroupTemplateProps {
  label: string;
  rows: IContentsRow[];
  examples: boolean;
  tagIds: string[];
}

const ContentGroupTemplate = (props: ContentGroupTemplateProps): JSX.Element => {
  const { label, examples, rows, tagIds } = props;

  return (
    <>
      <h4>
        <SanitisedHTMLContainer>{label}</SanitisedHTMLContainer>
      </h4>
      <ul>
        {rows.map((r) => (
          <Fragment key={r.description}>
            <li>
              <div>
                <SanitisedHTMLContainer className="content">{r.description}</SanitisedHTMLContainer>
                {examples && r.example && (
                  <SanitisedHTMLContainer className="example">{r.example}</SanitisedHTMLContainer>
                )}
                <div className="content">
                  <p>
                    {r.tags
                      .filter((id) => tagIds.includes(id))
                      .map((id) => findTag(id).tag)
                      .map((tag, index) => (
                        <Fragment key={tag}>
                          {index !== 0 && ', '}
                          <strong className="doc-tag">{tag}</strong>
                        </Fragment>
                      ))}
                  </p>
                </div>
              </div>
            </li>
          </Fragment>
        ))}
      </ul>
    </>
  );
};

export const ContentToCTemplate = (
  props: Pick<ContentTemplateProps, 'courseContent' | 'accessPoints' | 'content'>,
) => {
  const { courseContent, accessPoints, content } = props;

  return (
    <>
      <p className="h2">{courseContent.content_organiser}</p>
      {/* <p className="h3">Outcomes</p> */}
      {/* {accessPoints && courseContent.accessPoints.length > 0 && ( */}
      {/*  <> */}
      {/*    <p className="h3">Access content points</p> */}
      {/*    {courseContent.accessPoints.map((group) => { */}
      {/*      const text = stripHtml(group.content_group); */}
      {/*      return ( */}
      {/*        <p className="h4" key={text}> */}
      {/*          {text} */}
      {/*        </p> */}
      {/*      ); */}
      {/*    })} */}
      {/*  </> */}
      {/* )} */}
      {/* {content && courseContent.groups.length > 0 && ( */}
      {/*  <> */}
      {/*    <p className="h3">Content</p> */}
      {/*  </> */}
      {/* )} */}
    </>
  );
};

export interface ContentTemplateProps {
  courseContent: IContents;
  accessPoints: boolean;
  content: boolean;
  examples: boolean;
  tagIds: string[];
  isFirst: boolean;
}

const ContentTemplate = (props: ContentTemplateProps): JSX.Element => {
  const { courseContent, accessPoints, content, examples, tagIds, isFirst } = props;

  return (
    <>
      <h2 className={isFirst ? '' : 'new-page'}>{courseContent.content_organiser}</h2>
      <h3>Outcomes</h3>
      <p>A student:</p>
      <ul>
        {courseContent.outcomes.map((o) => (
          <li key={o.key}>
            <div>{o.value}</div>
            <div>
              <strong>{o.key}</strong>
            </div>
          </li>
        ))}
      </ul>

      {accessPoints && courseContent.accessPoints.length > 0 && (
        <>
          <h3>Access content points</h3>
          {courseContent.accessPoints.map((group) => (
            <ContentGroupTemplate
              key={group.content_group}
              label={group.content_group}
              rows={group.rows}
              examples={examples}
              tagIds={tagIds}
            />
          ))}
        </>
      )}

      {content && courseContent.groups.length > 0 && (
        <>
          <h3>Content</h3>
          {courseContent.groups.map((group) => (
            <ContentGroupTemplate
              key={group.content_group}
              label={group.content_group}
              rows={group.rows}
              examples={examples}
              tagIds={tagIds}
            />
          ))}
        </>
      )}
    </>
  );
};

export default ContentTemplate;
