import { HeadingLevel, ISectionOptions } from 'docx';
import { IContents } from '../../backendTypes';
import { notEmpty } from '../../functions';
import CMSSection from './CMSSection';
import {
  GenericHeadingSectionAsPromise,
  GenericHeadingSectionOptions,
} from './GenericHeadingSection';
import { buildSelectedStageContent } from '../../../components/document/SyllabusTemplate';
import { AllStages } from '../../../store/mock/stages';

const SupportSection = (
  content: IContents[],
  stageIds: string[],
  options: GenericHeadingSectionOptions,
): Promise<ISectionOptions>[] => {
  const stageContent = buildSelectedStageContent(content, stageIds);

  return [
    GenericHeadingSectionAsPromise(options),
    ...AllStages.filter((stage) => stageIds.includes(stage.id))
      .flatMap((stage) => stageContent[stage.id])
      .filter((c) => notEmpty(c.teaching_advice))
      .map((c, index) =>
        CMSSection(c.teaching_advice!, {
          newPage: index !== 0,
          heading: {
            text: c.content_organiser,
            headingLevel: HeadingLevel.HEADING_2,
          },
        }),
      ),
  ];
};

export default SupportSection;
