import React from 'react';
import { Grid } from '@material-ui/core';
import NSWGovernmentLogo from '../../assets/images/nsw-gov-logo.svg';

export interface UserSelectHeaderProps {}

export default function UserSelectHeader(props: UserSelectHeaderProps) {
  return (
    <Grid className="user-select-header">
      <Grid container item xs={12} md={9} alignItems="center">
        <Grid item>
          <img src={NSWGovernmentLogo} alt="NSW Government Logo" />
        </Grid>
        <Grid item>
          <h1 className="user-select-header__title">NSW Curriculum</h1>
          <p className="user-select-header__sub-title">NSW Education Standards Authority</p>
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={3}
        justifyContent="flex-end"
        className="user-select-header__goto-nesa"
      >
        <a
          target="__blank"
          href="https://www.educationstandards.nsw.edu.au/wps/portal/nesa/home"
          className="user-select-header__nesa-link"
        >
          Go to NESA
        </a>
      </Grid>
    </Grid>
  );
}
