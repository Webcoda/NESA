import React, { MouseEvent, ReactNode } from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Grid, makeStyles } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { isMobile } from 'react-device-detect';

const Transition = React.forwardRef(
  (props: { children?: React.ReactElement<any, any> }, ref: React.Ref<unknown>) => (
    <Slide direction="right" ref={ref} {...props} />
  ),
);

export interface CustomModalProps {
  /*
   * Modal title
   * */
  title: string;
  /*
   * Modal position at the moment can be LEFT,
   * otherwise it will be centered as default
   * */
  modalPosition?: string;
  /*
   * Show/Hide modal flag variable
   * */
  modalStatus: boolean;
  /*
   * Any react component to be displayed in the modal body
   * */
  children: ReactNode;
  /*
   * Flag to hide/show cancel button
   * */
  hideCancelButton?: boolean;
  /*
   * Function to be used on the Cancel button
   * */
  handleCancel?: (event: MouseEvent<HTMLButtonElement>) => void;
  /*
   * Function to be used on the Confirm button
   * */
  handleConfirm?: (event: MouseEvent<HTMLButtonElement>) => void;
  /*
   * Flag to hide/show Change Log button
   * */
  showChangeLogButton?: boolean;
  /*
   * Function to be used on the Change log button
   * */
  handleChangeLog?: (event: MouseEvent<HTMLButtonElement>) => void;
  maxWidth?: DialogProps['maxWidth'];
}

const useStyles = makeStyles({
  dialog: {
    position: 'absolute',
    left: isMobile ? '60%' : '40%',
    top: '50%',
    transform: 'translate(-75%,-50%)',
  },
});

export default function CustomModal(props: CustomModalProps) {
  const {
    title,
    children,
    handleConfirm,
    handleCancel,
    modalStatus,
    modalPosition,
    hideCancelButton,
    showChangeLogButton,
    handleChangeLog,
    maxWidth,
  } = props;
  const classes = useStyles();
  const modalLeftClasses = {
    paper: classes.dialog,
  };

  return (
    <Dialog
      open={modalStatus}
      keepMounted
      onClose={handleCancel}
      aria-labelledby={title}
      aria-describedby={title}
      TransitionComponent={Transition}
      maxWidth={maxWidth}
      classes={modalPosition === 'LEFT' ? modalLeftClasses : {}}
    >
      <Grid
        container
        id="alert-dialog-slide-title"
        justifyContent="space-between"
        alignItems="center"
        className="custom-modal__heading"
      >
        <p className="custom-modal__title">{title}</p>
        {showChangeLogButton && (
          <Grid className="custom-modal__dialog-actions-with-change-loga">
            <button
              type="button"
              className="button button--grey button--full-width nsw-button"
              onClick={handleChangeLog}
            >
              Change Log
            </button>
          </Grid>
        )}
      </Grid>
      <DialogContent>
        <div>{children}</div>
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid className="custom-modal__cancel-and-done">
            {!hideCancelButton && (
              <button type="button" className="nsw-button nsw-button--white" onClick={handleCancel}>
                Cancel
              </button>
            )}
            {handleConfirm && (
              <button
                type="button"
                className="nsw-button nsw-button--primary"
                onClick={handleConfirm}
              >
                Done
              </button>
            )}
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
