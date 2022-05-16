import { HeadingLevel, ISectionOptions, Paragraph, SectionType, TableOfContents } from 'docx';

const ToCSection = (): ISectionOptions => ({
  properties: {
    type: SectionType.NEXT_PAGE,
  },
  children: [
    new Paragraph({
      text: 'Table of Contents',
      heading: HeadingLevel.HEADING_1,
    }),
    new TableOfContents('Table of Contents', {
      hyperlink: true,
      headingStyleRange: '1-2',
    }),
  ],
});

export default ToCSection;
