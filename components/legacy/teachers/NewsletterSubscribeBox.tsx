import React from 'react';
import { Grid, Paper } from '@material-ui/core';

export interface NewsletterSubscribeBoxProps {
  className?: string;
}

const NewsletterSubscribeBox = (props: NewsletterSubscribeBoxProps): JSX.Element => {
  const { className } = props;
  return (
    <Paper className={`notice-list ${className}`} elevation={3}>
      <div className="notice-list__footer">
        <Grid container item direction="column">
          <h3>Subscribe to newsletter</h3>
          <p>Enter your email</p>
          <form
            className="js-cm-form"
            id="subForm"
            dir="ltr"
            action="https://www.createsend.com/t/subscribeerror?description="
            method="post"
            data-id="A61C50BEC994754B1D79C5819EC1255CCD2386443FB26FD42AF3FD1A3BBC639461D336C703F790384209E6460314264B9A4A6B927DB579AFC629F4679604D723"
          >
            <div className="emailbox">
              <input
                name="cm-yuiuurk-yuiuurk"
                className="js-cm-email-input emailbox__input"
                id="fieldEmail"
                type="email"
                aria-label="Subscribe"
              />
              <button
                type="submit"
                className="emailbox__submit button nsw-button nsw-button--primary"
              >
                Confirm
              </button>
            </div>
          </form>
        </Grid>
      </div>
    </Paper>
  );
};

export default NewsletterSubscribeBox;
