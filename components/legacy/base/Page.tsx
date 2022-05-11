import React, { ReactNode } from 'react';
import { Grid } from '@material-ui/core';
import TopHeader from './TopHeader';

export interface PageProps {
  children?: ReactNode;
  hideFooter?: boolean;
}

const Page = (props: PageProps): JSX.Element => {
  const { children } = props;

  return (
    <Grid className="page">
      <TopHeader />
      <Grid className="nsw-container">{children}</Grid>
    </Grid>
  );
};

export default Page;
