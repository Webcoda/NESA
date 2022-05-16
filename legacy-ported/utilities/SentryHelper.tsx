import * as Sentry from '@sentry/browser';
import React from 'react';

/*
*  Example of error handling.
    try {
      // code here....
    } catch (e) {
      errorHandling({ tag: 'page', tagDetails: 'home page', errorMessage: e.toString() });
    }
* */

/*
  IF we need Sentry with redux please see link below
  https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/redux/
*/

export function SentryFallbackComponent() {
  // https://docs.sentry.io/platforms/javascript/guides/react/components/errorboundary/
  return (
    <div className="nsw-sitewide-message  nsw-sitewide-message--critical">
      <div className="nsw-sitewide-message__wrapper">
        <div className="nsw-sitewide-message__content">
          <h2 className="nsw-sitewide-message__title">Oops, something went</h2>
          <p>You have encountered an error, please refresh your page.</p>
          <button
            type="button"
            className="nsw-button nsw-button--white"
            onClick={() => window.location.reload()}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export type SentryErrorType = {
  tag: string;
  tagDetails: string;
  errorMessage: string;
};
/**
 * Function receives a sentryError object that contains: tag, tagDetails and errorMessage
 * @param sentry
 */
export function errorHandling(sentry: SentryErrorType) {
  // console.log('error');
  // console.log(sentry);
  const { tag, tagDetails, errorMessage } = sentry;

  /*
   * Sending error log in Sentry
   * Setting Tag to set Alert Rule for sending alert message to slack
   */
  const sentryScope = (scope: any) => {
    scope.setTag(tag, tagDetails);
  };
  Sentry.configureScope(sentryScope);
  Sentry.captureException(new Error(errorMessage));
}

export default {
  SentryFallbackComponent,
  errorHandling,
};
