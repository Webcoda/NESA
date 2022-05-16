import { Document } from 'docx';
import ToCSection from './sections/TableOfContentsSection';
import TitleSection from './sections/TitleSection';
import styles from './styles';
import CopyrightSection from './sections/CopyrightSection';
import { IGlossary, IGlossaryRecord, ISyllabusFull } from '../backendTypes';
import { SyllabusOptions } from '../../components/document/SyllabusTemplate';
import DocxSyllabusTemplate from './DocxSyllabusTemplate';
import GlossariesSection from './sections/GlossariesSection';

export interface DocumentOptions {
  syllabuses: ISyllabusFull[];
  allGlossaryItems: IGlossary[];
  options: SyllabusOptions;
  stageIds: string[];
  tagIds: string[];
}

export default function DocxTemplate(documentProps: DocumentOptions) {
  const { syllabuses, allGlossaryItems, options, stageIds, tagIds } = documentProps;

  let glossaries: IGlossary[] | null = null;

  if (options.glossary) {
    const klaIds = syllabuses.reduce<string[]>(
      (acc, syl) => (acc.includes(syl.kla_id) ? acc : [...acc, syl.kla_id]),
      [],
    );

    glossaries = allGlossaryItems;

    // Filter by learning areas
    if (klaIds.length > 0) {
      glossaries = glossaries.reduce<IGlossary[]>((sectionList, section) => {
        // Filter records within a section
        const filteredRecords = section.records.reduce<IGlossaryRecord[]>((recordList, record) => {
          if (klaIds.includes(record.klaId ?? '') || record.klaId === null) {
            recordList.push(record);
          }
          return recordList;
        }, []);

        // Remove any empty sections
        if (filteredRecords.length > 0) {
          sectionList.push({
            section: section.section,
            records: filteredRecords,
          });
        }
        return sectionList;
      }, []);
    }
  }

  const sections = [
    ...syllabuses.map((syllabus) => DocxSyllabusTemplate({ ...documentProps, syllabus })),
  ];
  if (glossaries) {
    sections.push(GlossariesSection(glossaries?.flatMap((sec) => sec.records)));
  }

  return Promise.all(sections).then(
    (syllabusBodies) =>
      new Document({
        externalStyles: styles,
        sections: [TitleSection(), CopyrightSection(), ToCSection(), ...syllabusBodies.flat()],
      }),
  );
}
