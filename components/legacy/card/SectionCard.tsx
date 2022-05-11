import React from 'react';
import { Grid, GridSize } from '@material-ui/core';
import { SectionPage } from '../../pages/Home';
import ArrowButton from '../base/ArrowButton';

export interface SectionCardProps {
  /**
   * Card's title
   */

  title: string;
  /**
   * Card's subtitle
   */
  subtitle?: string;

  /**
   * Card's background colour
   */
  backgroundColor: string;

  /**
   * Divider bar colour, it shows between the titles and pages links
   */
  dividerColor: string;

  /**
   * Card's font colour
   */
  fontColor: string;

  /**
   * Arrow's font colour
   */
  arrowColor?: string;

  /**
   * Based on the design, this field allows you to define the number of Columns
   * to display the items in large screens only
   */
  numberOfColumns: number;

  /**
   * Array of section pages
   */
  pages: SectionPage[];
}

export default function SectionCard(props: SectionCardProps) {
  const {
    title,
    subtitle,
    backgroundColor,
    dividerColor,
    fontColor,
    arrowColor,
    pages,
    numberOfColumns,
  } = props;

  return (
    <div className="section-card" style={{ backgroundColor, color: fontColor }}>
      <Grid container className="section-card__wrapper">
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={3}
          alignItems="center"
          className="section-card__item"
        >
          <div className="section-card__titles">
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={1} className="section-card__divider-container">
          <div className="section-card__divider" style={{ backgroundColor: dividerColor }} />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={8}
          alignItems="center"
          justifyContent="flex-start"
          className="section-card__buttons"
        >
          {pages.map((item) => (
            <Grid item xs={12} sm={6} md={6} lg={numberOfColumns as GridSize} key={item.id}>
              <ArrowButton
                title={item.title}
                prefix={item.prefix}
                path={item.path}
                fontColor={fontColor}
                arrowColor={arrowColor}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
