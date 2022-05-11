import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import TreePicker from './TreePicker';
import { makeLearningAreaTree, stageOptions } from './CustomSyllabusPicker';
import { arrayToggleMultiple } from '../../utilities/functions';
import { TreeElement } from './treeUtils';
import useSyllabusList from '../../utilities/hooks/useSyllabusList';

export const ResourcesTree: TreeElement[] = [
  {
    id: 'root',
    label: 'All support materials',
    children: [
      {
        id: 'syllabus-support',
        label: 'Syllabus support',
        children: [
          // {
          //   id: 'intro',
          //   label: 'Introduction to the syllabus',
          // },
          {
            id: 'Sample scope and sequence',
            label: 'Sample scope and sequences',
          },
          {
            id: 'Sample unit',
            label: 'Sample units',
          },
          {
            id: 'work',
            label: 'Sample Work',
          },
          {
            id: 'Teaching advice',
            label: 'Teaching advice',
          },
          {
            id: 'life-skills',
            label: 'Life skills outcome worksheets',
          },
          {
            id: 'Other',
            label: 'Other',
          },
          // TODO: Add after MVP
          // {
          //   id: 'graded',
          //   label: 'Graded and annotated work',
          // },
          // {
          //   id: 'standards',
          //   label: 'Standards materials',
          // },
          // {
          //   id: 'past-hsc',
          //   label: 'Past HSC examination papers',
          // },
        ],
      },
      {
        id: 'global-support',
        label: 'Global support',
        children: [
          {
            id: 'glossary',
            label: 'Glossary',
            children: [
              {
                id: 'glossary-pdf',
                label: 'PDF',
              },
              {
                id: 'glossary-doc',
                label: 'Doc',
              },
            ],
          },
          // TODO: Add after MVP
          // {
          //   id: 'texts',
          //   label: 'Prescribed/suggested text list',
          // },
          // {
          //   id: 'guide',
          //   label: 'Parent guides',
          // },
          // TODO: Add after MVP
          // {
          //   id: 'ace',
          //   label: 'Credential requirements (ACE)',
          // },
        ],
      },
    ],
  },
];

export interface CustomResourcePickerProps {
  onChange: (selected: { learningAreas: string[]; stages: string[]; resources: string[] }) => void;
}

const CustomResourcePicker = (props: CustomResourcePickerProps): JSX.Element => {
  const { onChange } = props;

  const allSyllabuses = useSyllabusList();

  // selected items
  const [learningAreas, setLearningAreas] = useState<string[]>([]);
  const [stages, setStages] = useState<string[]>([]);
  const [resources, setResources] = useState<string[]>([]);

  const handleLearningAreas = (ids: string[]) => {
    const updated = arrayToggleMultiple(learningAreas, ids);
    setLearningAreas(updated);

    if (onChange) {
      onChange({
        learningAreas: updated,
        stages,
        resources,
      });
    }
  };

  const handleStages = (ids: string[]) => {
    const updated = arrayToggleMultiple(stages, ids);
    setStages(updated);

    if (onChange) {
      onChange({
        learningAreas,
        stages: updated,
        resources,
      });
    }
  };

  const handleResources = (ids: string[]) => {
    const updated = arrayToggleMultiple(resources, ids);
    setResources(updated);

    if (onChange) {
      onChange({
        learningAreas,
        stages,
        resources: updated,
      });
    }
  };

  return (
    <Grid container className="resource-picker" spacing={1}>
      <Grid item md={12} lg={4} className="resource-picker__column">
        <div className="resource-picker__picker resource-picker__picker--learning-areas">
          <TreePicker
            rootElements={makeLearningAreaTree(allSyllabuses)}
            selected={learningAreas}
            onChange={handleLearningAreas}
          />
        </div>
      </Grid>
      <Grid item md={12} lg={3} className="resource-picker__column">
        <div className="resource-picker__picker resource-picker__picker--stages">
          <TreePicker rootElements={stageOptions} selected={stages} onChange={handleStages} />
        </div>
      </Grid>
      <Grid item md={12} lg={5} className="resource-picker__column">
        <div className="resource-picker__picker resource-picker__picker--resources">
          <TreePicker
            rootElements={ResourcesTree}
            selected={resources}
            onChange={handleResources}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default CustomResourcePicker;
