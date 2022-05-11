import * as React from 'react';
import { Grid } from '@material-ui/core';
import { Button } from 'nsw-ds-react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export interface IBannerProps {
  name: string;
  title: string;
  description?: string;
  buttonLabel: string;
  onClick?: () => void;
}

export default function Banner(props: IBannerProps) {
  const { name, buttonLabel, title, description, onClick } = props;

  return (
    <div className={`banner banner__${name}`}>
      <Grid className="banner__content" container item xs={12} md={6}>
        <h3 className="banner__title">{title}</h3>
        {description &&
          <p className="banner__description">{description}</p>
        }
        <Button onClick={onClick} className="banner__button">
          {buttonLabel}
          <ChevronRightIcon />
        </Button>
      </Grid>
    </div>
  );
}