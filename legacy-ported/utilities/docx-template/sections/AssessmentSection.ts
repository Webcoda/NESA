import { ISectionOptions, Paragraph, Table, TableCell, TableRow } from 'docx';
import GenericHeadingSection, { GenericHeadingSectionOptions } from './GenericHeadingSection';
import { ISyllabusGrade } from '../../backendTypes';
import { parseParagraphChildren } from '../../html-docx-converter/htmlDocxConverter';

const AssessmentSection = (
  grades: ISyllabusGrade[],
  options: GenericHeadingSectionOptions,
): Promise<ISectionOptions> =>
  Promise.all(
    // Parse html in grade and description
    grades.map((grade) =>
      Promise.all([
        parseParagraphChildren(grade.grade),
        parseParagraphChildren(grade.description),
        // Convert to an object for easier access
      ]).then(([heading, description]) => ({ heading, description })),
    ),
  ).then((rows) =>
    // Create a section and table
    GenericHeadingSection(options, [
      new Table({
        rows: [
          // Heading Row
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                children: [new Paragraph('Grade')],
              }),
              new TableCell({
                children: [new Paragraph('Description')],
              }),
            ],
          }),
          // Body rows
          ...rows.map(
            (row) =>
              new TableRow({
                cantSplit: true,
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: row.heading,
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: row.description,
                      }),
                    ],
                  }),
                ],
              }),
          ),
        ],
      }),
    ]),
  );

export default AssessmentSection;
