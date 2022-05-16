import { HeadingLevel, ISectionOptions, Paragraph, SectionType } from 'docx';
import { DocumentOptions } from './DocxTemplate';
import { ISyllabusFull } from '../backendTypes';
import { SyllabusOptionOrder } from '../../components/document/SyllabusTemplate';
import CMSSection from './sections/CMSSection';
import OutcomesSection from './sections/OutcomesSection';
import ContentSections from './sections/ContentSections';
import SupportSection from './sections/SupportSection';

export default function DocxSyllabusTemplate(
  documentProps: Omit<DocumentOptions, 'allGlossaryItems' | 'syllabuses'> & {
    syllabus: ISyllabusFull;
  },
): Promise<ISectionOptions[]> {
  const { syllabus, options, stageIds, tagIds } = documentProps;
  const selectedSections = SyllabusOptionOrder.filter((opt) => options[opt]);

  if (selectedSections.length > 0) {
    return Promise.all([
      Promise.resolve<ISectionOptions>({
        properties: {
          type: SectionType.NEXT_PAGE,
        },
        children: [
          new Paragraph({
            text: syllabus.syllabusName,
            heading: HeadingLevel.HEADING_1,
          }),
        ],
      }),
      ...selectedSections.reduce<Promise<ISectionOptions>[]>((list, opt, index) => {
        switch (opt) {
          case 'courseOverview':
            list.push(
              CMSSection(syllabus.course_overview, {
                newPage: index > 0,
                heading: {
                  text: 'Course overview',
                  headingLevel: HeadingLevel.HEADING_2,
                },
              }),
            );
            break;
          case 'rationale':
            list.push(
              CMSSection(syllabus.rationale, {
                newPage: index > 0,
                heading: {
                  text: 'Rationale',
                  headingLevel: HeadingLevel.HEADING_2,
                },
              }),
            );
            break;
          case 'aim':
            list.push(
              CMSSection(syllabus.aim, {
                newPage: index > 0,
                heading: {
                  text: 'Aim',
                  headingLevel: HeadingLevel.HEADING_2,
                },
              }),
            );
            break;
          case 'outcomes':
            if (syllabus.outcomes && stageIds.length > 0) {
              list.push(
                OutcomesSection(syllabus.outcomes, stageIds, {
                  newPage: index > 0,
                  heading: {
                    text: 'Table of outcomes',
                    headingLevel: HeadingLevel.HEADING_2,
                  },
                }),
              );
            }
            break;
          // DC-357 content auto-selected when accessPoints or examples are checked.
          // case 'accessPoints':
          //   if (options.examples) {
          //     // Don't double render
          //     break;
          //   }
          // eslint-disable-next-line no-fallthrough
          // case 'examples':
          case 'content':
            if (syllabus.contents) {
              list.push(
                ...ContentSections(
                  syllabus.contents,
                  stageIds,
                  tagIds,
                  options.accessPoints,
                  true,
                  options.examples,
                  index > 0,
                ),
              );
            }
            break;
          case 'support':
            if (syllabus.contents && syllabus.contents.some((c) => c.teaching_advice)) {
              list.push(
                ...SupportSection(syllabus.contents, stageIds, {
                  heading: {
                    text: 'Teaching advice',
                    headingLevel: HeadingLevel.HEADING_1,
                  },
                  newPage: index > 0,
                }),
              );
            }
            break;
          // case 'assessment': dc-324 Assessment removed
          //   list.push(
          //     AssessmentSection(syllabus.grades, {
          //       newPage: index > 0,
          //       heading: {
          //         text: 'Assessment',
          //         headingLevel: HeadingLevel.HEADING_2,
          //       },
          //     }),
          //   );
          //   break;
          // case 'glossary': glossary is shown at the end of the document
          default:
            break;
        }
        return list;
      }, []),
    ]);
  }
  return Promise.resolve([]);
}
