import { HeadingLevel, ISectionOptions, Paragraph, SectionType, TextRun } from 'docx';
import { GenericHeadingSectionAsPromise } from './GenericHeadingSection';
import { IGlossaryRecord } from '../../backendTypes';
import {
  parseParagraphChildren,
  parseSectionChildren,
} from '../../html-docx-converter/htmlDocxConverter';
import { findKeyLearningArea } from '../../../store/mock/keyLearningAreas';

const GlossariesSection = (glossaries: IGlossaryRecord[]): Promise<ISectionOptions[]> =>
  Promise.all([
    GenericHeadingSectionAsPromise(
      {
        newPage: true,
        heading: {
          text: 'Glossary',
          headingLevel: HeadingLevel.HEADING_1,
        },
      },
      [],
    ),
    ...glossaries.map((record) =>
      Promise.all([
        parseParagraphChildren(record.term),
        parseSectionChildren(record.description),
        // Convert to an object for easier access
      ]).then<ISectionOptions>(([term, description]) => {
        const children: ISectionOptions['children'] = [
          new Paragraph({
            children: term,
            keepNext: true,
            style: 'GlossaryTerm',
          }),
        ];

        if (record.klaId) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: findKeyLearningArea(record.klaId).title,
                  italics: true,
                }),
              ],
              keepNext: true,
            }),
          );
        }
        children.push(...description);

        return {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          children,
        };
      }),
    ),
  ]);

export default GlossariesSection;
