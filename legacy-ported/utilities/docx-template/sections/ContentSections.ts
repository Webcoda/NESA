import { HeadingLevel, ISectionOptions, Paragraph, TextRun, UnderlineType } from 'docx';
import GenericHeadingSection, { GenericHeadingSectionAsPromise } from './GenericHeadingSection';
import { IContents, IContentsGroup, IContentsRow } from '../../backendTypes';
import { findTag } from '../../../store/mock/tags';
import {
  parseParagraphChildren,
  parseSectionChildren,
} from '../../html-docx-converter/htmlDocxConverter';
import { buildSelectedStageContent } from '../../../components/document/SyllabusTemplate';
import { AllStages } from '../../../store/mock/stages';
import { stripHtml } from '../../functions';

const ContentGroupRow = (
  row: IContentsRow,
  tagIds: string[],
  examples: boolean,
): Promise<ISectionOptions['children']> =>
  Promise.all([
    parseParagraphChildren(row.description),
    examples && row.example
      ? parseSectionChildren(row.example, { style: 'Example' })
      : Promise.resolve(null),
  ]).then(([description, example]) => {
    const paras: ISectionOptions['children'] = [
      new Paragraph({
        children: description,
        bullet: {
          level: 0,
        },
      }),
    ];

    if (example) {
      paras.push(...example);
    }

    // Include tags if there is at least one tag taken.
    if (tagIds.length && row.tags.some((id) => tagIds.includes(id))) {
      paras.push(
        new Paragraph({
          style: 'TagList',
          children: row.tags
            // Only include selected tags
            .filter((id) => tagIds.includes(id))
            .flatMap((id, index) => {
              const isFirst = index === 0;
              const runs: TextRun[] = [];

              if (!isFirst) {
                // Join tags with ', '
                runs.push(new TextRun(', '));
              }
              runs.push(
                new TextRun({
                  text: findTag(id).tag,
                  bold: true,
                  underline: {
                    type: UnderlineType.SINGLE,
                  },
                }),
              );

              return runs;
            }),
        }),
      );
    }
    return paras;
  });

const ContentGroupSection = (
  group: IContentsGroup,
  tagIds: string[],
  includeExamples: boolean,
): Promise<ISectionOptions> =>
  Promise.all(group.rows.map((row) => ContentGroupRow(row, tagIds, includeExamples))).then(
    (children) =>
      GenericHeadingSection(
        {
          heading: {
            text: stripHtml(group.content_group),
            headingLevel: HeadingLevel.HEADING_4,
          },
        },
        children.flat(),
      ),
  );

const ContentOrganiserSections = (
  organiser: IContents,
  tagIds: string[],
  includeAccessPoints: boolean,
  includeContent: boolean,
  includeExamples: boolean,
  newPage: boolean,
): Promise<ISectionOptions>[] => {
  const sections = [
    GenericHeadingSectionAsPromise(
      {
        newPage,
        heading: {
          text: organiser.content_organiser,
          headingLevel: HeadingLevel.HEADING_2,
        },
      },
      [
        new Paragraph({
          text: 'Outcomes',
          heading: HeadingLevel.HEADING_3,
        }),
        new Paragraph('A student:'),
        ...organiser.outcomes.map(
          (o) =>
            new Paragraph({
              children: [
                new TextRun(`${o.value} `),
                new TextRun({
                  text: o.key,
                  bold: true,
                }),
              ],
              bullet: {
                level: 0,
              },
            }),
        ),
      ],
    ),
  ];

  if (includeAccessPoints && organiser.accessPoints.length > 0) {
    sections.push(
      GenericHeadingSectionAsPromise({
        heading: {
          text: 'Access content points',
          headingLevel: HeadingLevel.HEADING_3,
        },
      }),
      ...organiser.accessPoints.map((group) => ContentGroupSection(group, tagIds, includeExamples)),
    );
  }

  if (includeContent && organiser.groups.length > 0) {
    sections.push(
      GenericHeadingSectionAsPromise({
        heading: {
          text: 'Content',
          headingLevel: HeadingLevel.HEADING_3,
        },
      }),
      ...organiser.groups.map((group) => ContentGroupSection(group, tagIds, includeExamples)),
    );
  }

  return sections;
};

export default function (
  content: IContents[],
  stageIds: string[],
  tagIds: string[],
  includeAccessPoints: boolean,
  includeContent: boolean,
  includeExamples: boolean,
  newPage: boolean,
): Promise<ISectionOptions>[] {
  const stageContent = buildSelectedStageContent(content, stageIds);

  return AllStages.filter((stage) => stageIds.includes(stage.id)).flatMap((stage, stageIndex) => [
    GenericHeadingSectionAsPromise(
      {
        newPage: newPage || stageIndex > 0,
        heading: {
          text: `Outcomes and content for ${stage.label}`,
          headingLevel: HeadingLevel.HEADING_2,
        },
      },
      [],
    ),
    ...stageContent[stage.id].flatMap((organiser, organiserIndex) =>
      ContentOrganiserSections(
        organiser,
        tagIds,
        includeAccessPoints,
        includeContent,
        includeExamples,
        organiserIndex > 0,
      ),
    ),
  ]);
}
