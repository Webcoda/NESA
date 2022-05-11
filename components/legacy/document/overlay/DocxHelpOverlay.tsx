import React, { ChangeEvent, useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, Grid } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import CustomModal, { CustomModalProps } from '../../base/CustomModal';

export interface DocxHelpOverlayProps {
  modalStatus: CustomModalProps['modalStatus'];
  handleConfirm: () => void;
}

const DocxHelpOverlay = (props: DocxHelpOverlayProps): JSX.Element => {
  const { modalStatus, handleConfirm } = props;

  const storageFlag = localStorage.getItem('docx-popup-blocked');
  const [blockPopup, setBlockPopup] = useState(storageFlag === 'true');

  useEffect(() => {
    if (modalStatus && (storageFlag === 'true' || isMobile)) {
      handleConfirm();
    }
  }, [modalStatus, blockPopup]);

  const handleOverlayConfirm = () => {
    localStorage.setItem('docx-popup-blocked', blockPopup ? 'true' : 'false');
    handleConfirm();
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBlockPopup(event.target.checked);
  };

  return (
    <CustomModal
      title="All Done!"
      modalStatus={modalStatus}
      hideCancelButton
      handleConfirm={handleOverlayConfirm}
      maxWidth="md"
    >
      <Grid container justifyContent="center" direction="column" className="docx-help">
        <p className="docx-help_message">
          To generate a Table of Contents, enable editing and click Yes to the popup.
        </p>
        <p>
          <FormControlLabel
            control={
              <Checkbox
                checked={blockPopup}
                onChange={handleCheckboxChange}
                name="checkedB"
                color="primary"
              />
            }
            label="Don't show this message again"
          />
        </p>
      </Grid>
    </CustomModal>
  );
};

export default DocxHelpOverlay;
