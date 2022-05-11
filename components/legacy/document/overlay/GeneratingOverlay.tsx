import React from 'react';
import { Grid } from '@material-ui/core';
import CustomModal, { CustomModalProps } from '../../base/CustomModal';

export interface GeneratingOverlayProps {
  modalStatus: CustomModalProps['modalStatus'];
}

const GeneratingOverlay = (props: GeneratingOverlayProps): JSX.Element => {
  const { modalStatus } = props;

  return (
    <CustomModal title="Processing.." modalStatus={modalStatus} hideCancelButton>
      <Grid container justifyContent="center" direction="column">
        <p>Please wait a moment while we generate your document.</p>
      </Grid>
    </CustomModal>
  );
};

export default GeneratingOverlay;
