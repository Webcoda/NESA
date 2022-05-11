import React from 'react';
import { FiberManualRecord } from '@material-ui/icons';
import { formatDate } from '../../utilities/functions';

export interface DateBoxProps {
  /**
   * The date to be displayed
   */
  date: Date;

  className?: string;
}

/**
 * A simple control to display dates.
 * @param props
 * @constructor
 */
const DateBox = (props: DateBoxProps): JSX.Element => {
  const { date, className = '' } = props;

  return (
    <div className={`datebox ${className}`}>
      <span className="datebox__label">{formatDate(date)}</span>
    </div>
  );
};

export default DateBox;
