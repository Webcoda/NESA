import {
  convertMillimetersToTwip,
  ISectionOptions,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from 'docx';
import GenericHeadingSection, { GenericHeadingSectionOptions } from './GenericHeadingSection';
import { IOutcome, KeyValueStrings } from '../../backendTypes';
import { AllStages } from '../../../store/mock/stages';

interface RowData {
  contentOrganiser: string;
  stageOutcomes: KeyValueStrings[][];
}

const OutcomesSection = (
  outcomes: IOutcome[],
  stageIds: string[],
  options: GenericHeadingSectionOptions,
): Promise<ISectionOptions> => {
  const stages = AllStages.filter((s) => stageIds.includes(s.id));

  const rows: RowData[] = [];

  outcomes.forEach((group) => {
    let row = rows.find((r) => r.contentOrganiser === group.content_organiser);

    if (!group.stageIds.some((stage) => stageIds.includes(stage))) {
      // Outcomes don't affect selected stages, so don't include in output.
      return;
    }

    if (!row) {
      row = {
        contentOrganiser: group.content_organiser,
        stageOutcomes: [],
      };
      rows.push(row);
    }

    stages.forEach((s, index) => {
      if (group.stageIds.includes(s.id)) {
        row!.stageOutcomes[index] = group.outcomes;
      }
    });
  });

  const width = convertMillimetersToTwip(159);
  const headingWidth = 2000;
  const columnWidth = (width - headingWidth) / stages.length;

  return Promise.resolve(
    GenericHeadingSection(options, [
      new Table({
        columnWidths: [headingWidth, columnWidth, columnWidth],
        rows: [
          // Heading Row
          new TableRow({
            tableHeader: true,
            children: [
              // Content Organiser Heading
              new TableCell({
                width: {
                  type: WidthType.DXA,
                  size: headingWidth,
                },
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: 'Content',
                        bold: true,
                      }),
                    ],
                  }),
                ],
              }),
              // Stage Headings
              ...stages.map(
                (stage) =>
                  new TableCell({
                    width: {
                      type: WidthType.DXA,
                      size: columnWidth,
                    },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `${stage.label} outcomes`,
                            bold: true,
                          }),
                          new TextRun({
                            text: 'A student:',
                            bold: true,
                            break: 1,
                          }),
                        ],
                      }),
                    ],
                  }),
              ),
            ],
          }),
          // Content organiser rows
          ...rows.map(
            (row) =>
              new TableRow({
                cantSplit: true,
                children: [
                  // Content Organiser heading
                  new TableCell({
                    width: {
                      type: WidthType.DXA,
                      size: headingWidth,
                    },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [new Paragraph(row.contentOrganiser)],
                  }),
                  // Stage content
                  ...stages.map(
                    (stage, index) =>
                      new TableCell({
                        width: {
                          type: WidthType.DXA,
                          size: columnWidth,
                        },
                        verticalAlign: VerticalAlign.CENTER,
                        children:
                          row.stageOutcomes[index]?.length > 0
                            ? // Stage has outcomes
                            row.stageOutcomes[index].flatMap((outcome) => [
                              new Paragraph(`${outcome.value} `),
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: outcome.key,
                                    bold: true,
                                  }),
                                ],
                              }),
                            ])
                            : // Stage has no outcomes
                            [
                              new Paragraph({
                                text: `No outcomes in ${stage.label}`,
                              }),
                            ],
                      }),
                  ),
                ],
              }),
          ),
        ],
      }),
    ]),
  );
};

export default OutcomesSection;
