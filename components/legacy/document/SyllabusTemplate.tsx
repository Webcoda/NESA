import React, { Fragment } from 'react';
import SanitisedHTMLContainer from '../base/SanitisedHTMLContainer';
import { IContents, ISyllabusFull } from '../../utilities/backendTypes';
import ContentTemplate, { ContentToCTemplate } from './ContentTemplate';
import { AllStages } from '../../store/mock/stages';
import OutcomesTemplate from './OutcomesTemplate';
import { stripHtml } from '../../utilities/functions';

// This needs to be kept in sync with the actual document content layout
export const SyllabusOptionOrder = [
  'courseOverview',
  'rationale',
  'aim',
  'outcomes',
  'content',
  'accessPoints',
  'examples',
  'support',
  'assessment',
  'glossary',
] as const;

export type SyllabusOptionsType = typeof SyllabusOptionOrder[number];

export type SyllabusOptions = {
  [key in SyllabusOptionsType]: boolean;
};

const isFirstSection = (section: SyllabusOptionsType, options: SyllabusOptions): boolean =>
  SyllabusOptionOrder.find((opt) => options[opt]) === section;

export const buildSelectedStageContent = (contents: IContents[], stageIds: string[]) =>
  stageIds.reduce<Record<string, IContents[]>>((acc, id) => {
    acc[id] = contents.filter((c) => c.stageIds.includes(id));
    return acc;
  }, {});

// Regex is an hN element containing at least 1 non-space character
// followed by a closing tag for that element.
const extractHeadings = (content: string): string[] =>
  content.match(/<h([1-2])>\s*\S.*?<\/h\1>/gi) ?? [];

// SanitisedHTMLContainer was breaking the table of content so I had to do this workaround
const TextHelper = ({ heading }: { heading: string }) => {
  const isH2 = heading.includes('h2');
  const isH3 = heading.includes('h3');
  const isH4 = heading.includes('h4');
  const text = stripHtml(heading);
  if (isH2) {
    return <p className="h2">{text}</p>;
  }
  if (isH3) {
    return <p className="h3">{text}</p>;
  }
  if (isH4) {
    return <p className="h4">{text}</p>;
  }
  return <p>{heading}</p>;
};

export const SyllabusToCTemplate = (props: Omit<SyllabusTemplateProps, 'tagIds'>) => {
  const { syllabus, options, stageIds } = props;

  const stageContent = buildSelectedStageContent(syllabus.contents ?? [], stageIds);
  return (
    <div className="table-data">
      <p className="h1">{syllabus.syllabusName}</p>
      {options.courseOverview && (
        <div>
          <p className="h2">Course overview</p>
          {extractHeadings(syllabus.course_overview).map((heading) => (
            <TextHelper key={heading} heading={heading} />
          ))}
        </div>
      )}
      {options.rationale && <p className="h2">Rationale</p>}
      {options.aim && <p className="h2">Aim</p>}
      {options.outcomes && syllabus.outcomes && <p className="h2">Table of outcomes</p>}
      {(options.content || options.accessPoints || options.examples) &&
        AllStages.filter((stage) => stageIds.includes(stage.id)).map(
          (stage) =>
            stageContent[stage.id]?.length > 0 && (
              <Fragment key={stage.id}>
                <p className="h2">Outcomes and content for {stage.label}</p>
                {stageContent[stage.id]?.map((c) => (
                  <ContentToCTemplate
                    key={c.code}
                    courseContent={c}
                    accessPoints={options.accessPoints}
                    content={options.content}
                  />
                ))}
              </Fragment>
            ),
        )}
      {options.support &&
        stageIds.some((stageId) =>
          stageContent[stageId].some((content) => !!content.teaching_advice),
        ) && (
          <>
            <p className="h1">Teaching advice</p>
            {AllStages.filter((stage) => stageIds.includes(stage.id))
              .flatMap((stage) => stageContent[stage.id])
              .map(
                (content) =>
                  content.teaching_advice && (
                    <Fragment key={content.code}>
                      <p className="h2">{content.content_organiser}</p>
                      {extractHeadings(content.teaching_advice).map((heading) => (
                        <TextHelper key={heading} heading={heading} />
                      ))}
                    </Fragment>
                  ),
              )}
          </>
      )}
      {/* {options.assessment && <p className="h2">Assessment</p>} dc-324 Assessment removed */}
    </div>
  );
};

export interface SyllabusTemplateProps {
  syllabus: ISyllabusFull;
  options: SyllabusOptions;
  stageIds: string[];
  tagIds: string[];
}

const SyllabusTemplate = (props: SyllabusTemplateProps): JSX.Element => {
  const { syllabus, options, stageIds, tagIds } = props;

  const stageContent = buildSelectedStageContent(syllabus.contents ?? [], stageIds);

  return (
    <>
      <h1 className="new-page">{syllabus.syllabusName}</h1>
      {options.courseOverview && (
        <>
          <h2 className={isFirstSection('courseOverview', options) ? '' : 'new-page'}>
            Course overview
          </h2>
          <SanitisedHTMLContainer>{syllabus.course_overview}</SanitisedHTMLContainer>
        </>
      )}
      {options.rationale && (
        <>
          <h2 className={isFirstSection('rationale', options) ? '' : 'new-page'}>Rationale</h2>
          <SanitisedHTMLContainer>{syllabus.rationale}</SanitisedHTMLContainer>
        </>
      )}
      {options.aim && (
        <>
          <h2 className={isFirstSection('aim', options) ? '' : 'new-page'}>Aim</h2>
          <SanitisedHTMLContainer>{syllabus.aim}</SanitisedHTMLContainer>
        </>
      )}
      {options.outcomes && syllabus.outcomes && (
        <>
          <h2 className={isFirstSection('outcomes', options) ? '' : 'new-page'}>
            Table of outcomes
          </h2>
          <OutcomesTemplate outcomes={syllabus.outcomes} stageIds={stageIds} />
        </>
      )}
      {(options.content || options.examples || options.accessPoints) &&
        AllStages.filter((stage) => stageIds.includes(stage.id)).map(
          (stage) =>
            stageContent[stage.id]?.length > 0 && (
              <Fragment key={stage.id}>
                <h2
                  className={
                    (isFirstSection('content', options) ||
                      isFirstSection('examples', options) ||
                      isFirstSection('accessPoints', options)) &&
                    stage.id === stageIds[0]
                      ? ''
                      : 'new-page'
                  }
                >
                  Outcomes and content for {stage.label}
                </h2>
                {stageContent[stage.id]?.map((c, index) => (
                  <ContentTemplate
                    key={c.code}
                    courseContent={c}
                    accessPoints={options.accessPoints}
                    content
                    examples={options.examples}
                    tagIds={tagIds}
                    isFirst={index === 0}
                  />
                ))}
              </Fragment>
            ),
        )}
      {options.support &&
        stageIds.some((stageId) =>
          stageContent[stageId].some((content) => !!content.teaching_advice),
        ) && (
          <>
            <h1 className={isFirstSection('support', options) ? '' : 'new-page'}>
              Teaching advice
            </h1>
            {AllStages.filter((stage) => stageIds.includes(stage.id))
              .flatMap((stage) => stageContent[stage.id])
              .map(
                (content) =>
                  content.teaching_advice && (
                    <Fragment key={content.code}>
                      <h2>{content.content_organiser}</h2>
                      <SanitisedHTMLContainer>{content.teaching_advice}</SanitisedHTMLContainer>
                    </Fragment>
                  ),
              )}
          </>
      )}
      {/* {options.assessment && ( dc-324 Assessment removed */}
      {/*  <> */}
      {/*    <h2 className={isFirstSection('assessment', options) ? '' : 'new-page'}> */}
      {/*      Assessment */}
      {/*    </h2> */}
      {/*    <AssessmentTemplate grades={syllabus.grades} /> */}
      {/*  </> */}
      {/* )} */}
    </>
  );
};

export default SyllabusTemplate;
