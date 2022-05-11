import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { isMobile } from 'react-device-detect';

export interface OutcomeCardProps {
  /*
   * Title of the outcome
   * */
  title: string;
  /*
   * List of the outcomes
   * */
  outcomes?: string[];
  /**
   * Whether the card is currently selected
   */
  selected?: boolean;
  /**
   * Whether the card is selectable
   */
  isSelectable?: boolean;
  /**
   * Whether the card is selectable
   */
  displayOutcome?: boolean;
  /**
   * Callback fired when card is pressed
   */
  onClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>,
  ) => void;

  /**
   * Content code
   */
  code?: string[];
}

export default function OutcomeCard(props: OutcomeCardProps) {
  const { title, outcomes, selected, isSelectable, onClick, code, displayOutcome = true } = props;

  return (
    <Paper
      className={`outcome-card nsw-p-md
        ${isSelectable ? 'outcome-card--selectable ' : ''}
        ${!onClick ? 'nsw-p-bottom-lg' : ''} 
        ${selected ? 'outcome-card--selected' : ''}
      `}
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyPress={onClick}
    >
      <Grid container className="outcome-card__title" alignItems="center" item xs={12}>
        <h4>
          {title} {onClick && <ChevronRightIcon />}
        </h4>
      </Grid>
      {outcomes && outcomes.map((outcome, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Grid key={`outcome-${index}`} container item xs={12} className="outcome-card__outcome">
          <Grid container item xs={12} sm={12} className="outcome-card__outcome-text">
            {code && !displayOutcome && <p className="strong nsw-p-top-sm nsw-p-bottom-sm">{code[index]}</p>}
            {displayOutcome && <p className="strong nsw-p-top-sm nsw-p-bottom-sm">Outcome</p>}
          </Grid>
          {!isMobile && <br />}
          <Grid container item xs={12} sm={12}>
            <p>{outcome}</p>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );
}
