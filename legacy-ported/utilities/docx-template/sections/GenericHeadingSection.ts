import { HeadingLevel, ISectionOptions, Paragraph, SectionType } from 'docx';

export interface GenericHeadingSectionOptions {
  newPage?: boolean;
  heading?: {
    headingLevel?: HeadingLevel;
    text: string;
  };
}

export default function GenericHeadingSection(
  options: GenericHeadingSectionOptions,
  children: ISectionOptions['children'] = [],
): ISectionOptions {
  const allChildren = [...children];
  if (options.heading) {
    allChildren.unshift(
      new Paragraph({
        text: options.heading.text,
        heading: options.heading.headingLevel,
      }),
    );
  }

  return {
    properties: {
      type: options.newPage ? SectionType.NEXT_PAGE : SectionType.CONTINUOUS,
    },
    children: [...allChildren],
  };
}

export function GenericHeadingSectionAsPromise(
  options: GenericHeadingSectionOptions,
  children?: ISectionOptions['children'],
): Promise<ISectionOptions> {
  return Promise.resolve(GenericHeadingSection(options, children));
}
