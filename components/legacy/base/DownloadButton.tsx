import React, { HTMLProps, ReactNode, useState } from 'react';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';
import JsFileDownloader from 'js-file-downloader';
import { CircularProgress, Tooltip } from '@material-ui/core';
import { detect } from 'detect-browser';
import { isMobile } from 'react-device-detect';
import { IResourceAttachment } from '../../utilities/backendTypes';
import { downloadFileUsingDOM } from '../document/documentFunctions';

export interface DownloadButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'onClick'> {
  attachments: IResourceAttachment[];
  idleIcon?: ReactNode;
  progressIcon?: ReactNode;
  successIcon?: ReactNode;
  errorIcon?: ReactNode;
  clearTimer?: number;
}

const states = ['idle', 'progress', 'success', 'error'] as const;
type DownloadState = typeof states[number];

const DownloadButton = (props: DownloadButtonProps): JSX.Element => {
  const {
    attachments,
    idleIcon = <CloudDownloadIcon />,
    successIcon = <DoneIcon />,
    progressIcon = <CircularProgress />,
    errorIcon = <ErrorIcon />,
    clearTimer = 1000,
    children,
    className,
    ...others
  } = props;
  const browser = detect();
  const mobileUserUsingChromeAndiOS =
    browser && browser.os === 'iOS' && browser.name === 'crios' && isMobile;

  const [state, setState] = useState<DownloadState>('idle');

  let stateIcon: ReactNode;
  switch (state) {
    case 'progress':
      stateIcon = progressIcon;
      break;
    case 'success':
      stateIcon = successIcon;
      break;
    case 'error':
      stateIcon = errorIcon;
      break;
    case 'idle':
    default:
      stateIcon = idleIcon;
      break;
  }

  const handleDownloadResources = () => {
    setState('progress');
    /**
     * Downloading multiple files
     */
    // for Chrome using iOS device we had to do this workaround
    if (mobileUserUsingChromeAndiOS) {
      attachments.forEach((attachment) => {
        downloadFileUsingDOM(attachment.filename, attachment.src);
      });
    } else {
      const downloads = attachments.map(
        (attachment) =>
          new JsFileDownloader({
            url: attachment.src,
            autoStart: true,
            forceDesktopMode: true,
            filename: attachment.filename,
          }),
      );

      Promise.all(downloads)
        .then(() => {
          console.log('Download Success');
          setState('success');
          setTimeout(() => setState('idle'), clearTimer);
        })
        .catch((err) => {
          console.error('Download failed', err);
          setState('error');
        });
    }
  };

  return (
    <Tooltip title="Something has gone wrong, please try again later">
      <button
        {...others}
        type="button"
        className={`button button--with-icon nsw-button ${
          state === 'error' ? 'nsw-button--danger' : 'nsw-button--secondary'
        } ${className ?? ''}`}
        onClick={handleDownloadResources}
      >
        {children}
        {stateIcon}
      </button>
    </Tooltip>
  );
};

export default DownloadButton;
