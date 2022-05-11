import React from 'react';
import { Grid } from '@material-ui/core';
import { TreeElement } from './treeUtils';
import TreePicker from './TreePicker';
import { Sections } from '../../constants/pathConstants';
import { PrimaryStages, SecondaryStages } from '../../store/mock/stages';
import { FixedTreePickerProps } from './TagPicker';

const primaryStageTree: TreeElement[] = PrimaryStages.map((s) => ({
  id: s.id,
  label: s.label,
  disabled: !s.available,
}));

const secondaryStageTree: TreeElement[] = SecondaryStages.map((s) => ({
  id: s.id,
  label: s.label,
  disabled: !s.available,
}));

const StagePicker = (props: FixedTreePickerProps): JSX.Element => {
  const { selected, ...others } = props;

  const primaryStages = selected.filter((stageId) =>
    PrimaryStages.some((stage) => stage.id === stageId),
  );
  const secondaryStages = selected.filter((stageId) =>
    SecondaryStages.some((stage) => stage.id === stageId),
  );

  return (
    <>
      <Grid item xs={12} md={6}>
        <h6>{Sections.STAGES.pages.PRIMARY.title}</h6>
        <TreePicker rootElements={primaryStageTree} selected={primaryStages} {...others} />
      </Grid>
      <Grid item xs={12} md={6}>
        <h6>{Sections.STAGES.pages.SECONDARY.title}</h6>
        <TreePicker rootElements={secondaryStageTree} selected={secondaryStages} {...others} />
      </Grid>
    </>
  );
};

export default StagePicker;
