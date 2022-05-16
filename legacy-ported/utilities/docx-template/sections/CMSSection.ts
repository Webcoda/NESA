import { ISectionOptions } from 'docx';
import { parseSectionChildren } from '../../html-docx-converter/htmlDocxConverter';
import GenericHeadingSection, { GenericHeadingSectionOptions } from './GenericHeadingSection';

const CMSSection = (
  content: string,
  options: GenericHeadingSectionOptions,
): Promise<ISectionOptions> =>
  parseSectionChildren(content).then((children) => GenericHeadingSection(options, children));

export default CMSSection;
