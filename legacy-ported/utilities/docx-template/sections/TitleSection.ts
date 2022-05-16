import {
  HeadingLevel,
  HorizontalPositionAlign,
  HorizontalPositionRelativeFrom,
  ImageRun,
  ISectionOptions,
  Paragraph,
  SectionType,
  TextRun,
  VerticalPositionAlign,
  VerticalPositionRelativeFrom,
} from 'docx';
import logoImage from '../logo';

const TitleSection = (): ISectionOptions => ({
  properties: {
    type: SectionType.NEXT_PAGE,
    titlePage: true,
  },
  children: [
    new Paragraph({
      children: [
        new TextRun('NSW Education Standards Authority'),
        new ImageRun({
          data: logoImage,
          transformation: {
            width: 119.055072, // For some reason there are 96 units/inch
            height: 119.055072,
          },
          floating: {
            horizontalPosition: {
              relative: HorizontalPositionRelativeFrom.MARGIN,
              align: HorizontalPositionAlign.RIGHT,
            },
            verticalPosition: {
              relative: VerticalPositionRelativeFrom.MARGIN,
              align: VerticalPositionAlign.TOP,
            },
          },
        }),
      ],
      heading: HeadingLevel.TITLE,
    }),
  ],
});

export default TitleSection;
