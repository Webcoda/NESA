import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { Grid } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { isMobile } from 'react-device-detect';
import DESIGN from '../../constants/designConstants';

export interface VideoModalProps {
  /**
   * Aria Label
   */
  ariaLabel: string;

  /*
   * Show/Hide modal flag variable
   * */
  modalStatus: boolean;

  /*
   * Video url
   * */
  video: string;

  /*
   * Function to be used on the modal close
   * */
  onCancel: () => void;
}

export default function VideoModal(props: VideoModalProps) {
  const { ariaLabel, onCancel, modalStatus, video } = props;

  const srcUrl = isMobile ? video : `${video}&autoplay`;

  return (
    <Dialog
      open={modalStatus}
      keepMounted
      onClose={onCancel}
      aria-labelledby={ariaLabel}
      aria-describedby={ariaLabel}
      fullScreen
      className="video-modal"
    >
      <Grid className="video-modal__video-container">
        <Grid container justifyContent="flex-end">
          <div
            role="button"
            className="video-modal__close-button"
            onClick={onCancel}
            onKeyPress={onCancel}
            tabIndex={0}
          >
            <CancelIcon style={{ color: DESIGN.COLOR_WHITE }} />
          </div>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" className="video-modal__video">
          {video &&
            <iframe
              src={srcUrl}
              title="Resource video"
              width="100%"
              height="100%"
              allow="autoplay"
              frameBorder="0"
            />
          }
        </Grid>
      </Grid>
    </Dialog>
  );
}
