import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import TreePicker from './TreePicker';
import { TreeElement } from './treeUtils';
import TagPicker from './TagPicker';
import { arrayToggleMultiple } from '../../utilities/functions';
import { AllKeyLearningAreas } from '../../store/mock/keyLearningAreas';
import { AllStages } from '../../store/mock/stages';
import { ISyllabus } from '../../utilities/backendTypes';
import useSyllabusList from '../../utilities/hooks/useSyllabusList';

export const makeLearningAreaTree = (syllabuses: ISyllabus[]): TreeElement[] => [
  {
    id: 'root',
    label: 'All learning areas and subjects',
    children: AllKeyLearningAreas.map((kla) => ({
      id: kla.id,
      label: kla.title,
      disabled: !kla.available,
      children: syllabuses
        .filter((syl) => kla.id === syl.kla_id)
        .map((syl) => ({
          id: syl.id,
          label: syl.syllabusName,
          disabled: !syl.available,
        })),
    })),
  },
];

export const stageOptions: TreeElement[] = [
  {
    id: 'root',
    label: 'All stages',
    children: AllStages.map((s) => ({
      id: s.id,
      label: s.label,
      disabled: !s.available,
    })),
  },
];

export const AllElements: TreeElement[] = [
  {
    id: 'root',
    label: 'All syllabus elements',
    children: [
      {
        id: 'course-overview',
        label: 'Course Overview',
      },
      {
        id: 'rationale',
        label: 'Rationale',
      },
      {
        id: 'aim',
        label: 'Aim',
      },
      {
        id: 'outcomes',
        label: 'Outcomes',
      },
      {
        id: 'all-content',
        label: 'Content',
        children: [
          {
            id: 'content',
            label: 'General Content',
          },
          {
            id: 'access-points',
            label: 'Access content points',
          },
          // {
          //   id: 'teaching-advice',
          //   label: 'Teaching Advice',
          // },
          {
            id: 'examples',
            label: 'Examples',
          },
          // {
          //   id: 'tags',
          //   label: 'Tags',
          // },
        ],
      },
      // {
      //   id: 'assessment',
      //   label: 'Assessment',
      // },
      {
        id: 'glossary',
        label: 'Glossary',
      },
      {
        id: 'teaching-and-learning',
        label: 'Teaching advice',
      },
    ],
  },
];

export const ElementIds = {
  CourseOverview: 'course-overview',
  Rationale: 'rationale',
  Aim: 'aim',
  Outcomes: 'outcomes',
  Content: 'content',
  AccessPoints: 'access-points',
  Examples: 'examples',
  Glossary: 'glossary',
  TeachingAdvice: 'teaching-and-learning',
};

export interface CustomSyllabusPickerProps {
  onChange: (selected: {
    learningAreas: string[];
    stages: string[];
    tags: string[];
    elements: string[];
  }) => void;
}

const CustomSyllabusPicker = (props: CustomSyllabusPickerProps): JSX.Element => {
  const { onChange } = props;

  const allSyllabuses = useSyllabusList();

  // selected items
  const [learningAreas, setLearningAreas] = useState<string[]>([]);
  const [stages, setStages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [elements, setElements] = useState<string[]>([]);

  const handleLearningAreas = (ids: string[]) => {
    const updated = arrayToggleMultiple(learningAreas, ids);
    setLearningAreas(updated);

    if (onChange) {
      onChange({
        learningAreas: updated,
        stages,
        tags,
        elements,
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
        tags,
        elements,
      });
    }
  };

  const handleTags = (ids: string[]) => {
    const updated = arrayToggleMultiple(tags, ids);
    setTags(updated);

    if (onChange) {
      onChange({
        learningAreas,
        stages,
        tags: updated,
        elements,
      });
    }
  };

  const handleElements = (ids: string[]) => {
    let updated = arrayToggleMultiple(elements, ids);

    // DC-357 Clear AccessPoints and Examples when content is unselected
    if (ids.includes(ElementIds.Content) && !updated.includes(ElementIds.Content)) {
      updated = updated.filter(
        (element) => element !== ElementIds.AccessPoints && element !== ElementIds.Examples,
      );
    }
    // DC-357 Select content if AccessPoints or Examples are selected
    if (
      (updated.includes(ElementIds.AccessPoints) || updated.includes(ElementIds.Examples)) &&
      !updated.includes(ElementIds.Content)
    ) {
      updated.push(ElementIds.Content);
    }

    setElements(updated);

    if (onChange) {
      onChange({
        learningAreas,
        stages,
        tags,
        elements: updated,
      });
    }
  };

  return (
    <Grid container className="syllabus-picker" spacing={1}>
      <Grid item md={12} lg={4} className="syllabus-picker__column">
        <div className="syllabus-picker__picker syllabus-picker__picker--tall syllabus-picker__picker--learning-areas">
          <TreePicker
            rootElements={makeLearningAreaTree(allSyllabuses)}
            selected={learningAreas}
            onChange={handleLearningAreas}
          />
        </div>
      </Grid>
      <Grid item md={12} lg={3} className="syllabus-picker__column">
        <div className="syllabus-picker__picker syllabus-picker__picker--stages">
          <TreePicker rootElements={stageOptions} selected={stages} onChange={handleStages} />
        </div>
        <div className="syllabus-picker__picker syllabus-picker__picker--elements">
          <TreePicker rootElements={AllElements} selected={elements} onChange={handleElements} />
        </div>
      </Grid>
      <Grid item md={12} lg={5} className="syllabus-picker__column">
        <div className="syllabus-picker__picker syllabus-picker__picker--tall syllabus-picker__picker--tags">
          <TagPicker selected={tags} onChange={handleTags} />
        </div>
      </Grid>
    </Grid>
  );
};

export default CustomSyllabusPicker;
