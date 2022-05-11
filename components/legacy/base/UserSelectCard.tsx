import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DESIGN from '../../constants/designConstants';
import { UserSelect } from '../../utilities/frontendTypes';

export interface UserSelectCardProps {
  data: UserSelect;
  handleClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function UserSelectCard(props: UserSelectCardProps) {
  const { data, handleClick } = props;

  return (
    <Paper className="user-select-card" role="button" onClick={handleClick}>
      <figure className="user-select-card__image">
        <img src={data.imgUrl} alt={`user select - ${data.title}`} />
        <figcaption className="user-select-card__title-description">
          <p className="user-select-card__title">{data.title}</p>
          <p className="user-select-card__description">{data.description}</p>
          <div className="user-select-card__icon">
            <ArrowForwardIcon style={{ color: DESIGN.COLOR_BLUE_PRIMARY, fontSize: '30px' }} />
          </div>
        </figcaption>
      </figure>
    </Paper>
  );
}
