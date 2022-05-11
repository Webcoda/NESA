import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export interface SelectableButtonProps {
  /*
   * Label of the Button
   * */
  label: string;
  /**
   * Whether the card is selected
   */
  buttonSelected?: boolean;
  /**
   * Callback fired when button is pressed
   */
  onClick?: () => void;
}

export default function SelectableButton(props: SelectableButtonProps) {
  const { label, buttonSelected, onClick } = props;
  return (
    <Paper
      className={`selectable-button nsw-p-sm
        ${buttonSelected ? 'selectable-button--selected nsw-p-sm' : ''}
      `}
      onClick={onClick}
      onKeyPress={onClick}
      role="button"
      tabIndex={0}
    >
      <Grid container className="selectable-button__title" alignItems="center" item xs={12}>
        <h4>{label}</h4>
        <ChevronRightIcon />
      </Grid>
    </Paper>
  );
}
