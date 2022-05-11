import React from 'react';
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Tooltip } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import DESIGN from '../../constants/designConstants';

const useStyles = makeStyles({
  label: {
    marginTop: 2,
    marginBottom: 2,
  },
  radio: {
    padding: 5,
  },
});

const CustomTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: DESIGN.COLOR_WHITE,
    maxWidth: 'unset',
    color: DESIGN.COLOR_BLACK,
    padding: '0px',
    // box-shadow from Material UI Paper
    boxShadow:
      '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  },
}))(Tooltip);

export interface RadioButtonsListProps {
  /**
   * Radio options
   */
  options: RadioButtonElement[];

  /**
   * Currently selected item
   */
  selected?: string;

  /**
   * Radio group name
   */
  label: string;

  /**
   * callback fired when a node is selected
   * @param ids the newly selected item's Id
   */
  onChange: (id: string) => void;
}

export interface RadioButtonElement {
  /**
   * Unique element name
   */
  id: string;

  /**
   * Display label
   */
  label: string;

  /**
   * More information
   */
  moreInfo?: string;
}

export const RadioButtonsList = (props: RadioButtonsListProps): JSX.Element => {
  const { options, selected = null, label, onChange } = props;
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const currentElement = options.find((element) => event.target.value === element.id);

      // console.log({ currentElement });
      if (currentElement) onChange(currentElement.id);
    }
  };

  return (
    <div className="radio-buttons-list">
      <FormControl component="fieldset">
        <RadioGroup
          aria-label={label}
          name={label}
          onChange={(eventValue) => handleChange(eventValue)}
          value={selected}
        >
          {options.map((element) => (
            <div className="radio-buttons-list__element" key={element.id}>
              <FormControlLabel
                classes={{
                  label: classes.label,
                }}
                value={element.label}
                control={
                  <Radio
                    className="radio-buttons-list__button"
                    classes={{ root: classes.radio }}
                    value={element.id}
                  />
                }
                label={element.label}
              />
              {element.moreInfo && (
                <CustomTooltip
                  title={
                    <Grid className="radio-buttons-list__info">
                      <p className="radio-buttons-list__info-detail">{element.moreInfo}</p>
                    </Grid>
                  }
                  placement="right"
                >
                  <div className="radio-buttons-list__tooltip-icon">
                    <ErrorIcon style={{ fontSize: '18px', color: DESIGN.COLOR_BLUE_PRIMARY }} />
                  </div>
                </CustomTooltip>
              )}
            </div>
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default RadioButtonsList;
