import React, { useRef, useState } from 'react';
import { Grid } from '@material-ui/core';
import CustomModal, { CustomModalProps } from '../base/CustomModal';
import doc from '../../assets/images/doc.png';
import pdf from '../../assets/images/pdf.png';
import DocumentTemplate, { DocumentTemplateProps } from './DocumentTemplate';
import { createDocx, createPDF } from './documentFunctions';
import useGlossaryStore from '../../utilities/hooks/useGlossaryTerms';
import GeneratingOverlay from './overlay/GeneratingOverlay';
import DocxHelpOverlay from './overlay/DocxHelpOverlay';

export interface DownloadViewOverlayProps extends DocumentTemplateProps {
  modalStatus: CustomModalProps['modalStatus'];
  handleConfirm: CustomModalProps['handleConfirm'];
}

const DownloadViewOverlay = (props: DownloadViewOverlayProps): JSX.Element => {
  const { modalStatus, handleConfirm, ...documentProps } = props;

  const documentContentRef = useRef<HTMLDivElement>(null);
  const [generatingStatus, setGenerating] = useState(false);
  const [showDocxHelp, setShowDocxHelp] = useState(false);
  const allGlossaryItems = useGlossaryStore();

  const closeModal = () => {
    setGenerating(false);
    setShowDocxHelp(false);
  };

  const handleCloseDocxHelp = () => {
    setShowDocxHelp(false);
  };

  const handleDownloadDoc = () => {
    setGenerating(true);
    createDocx({ ...documentProps, allGlossaryItems }).then(() => {
      setGenerating(false);
      setShowDocxHelp(true);
    });
  };

  const handleDownloadPDF = () => {
    setGenerating(true);
    createPDF(documentContentRef.current!, closeModal);
  };

  return (
    <>
      {modalStatus && (
        <>
          <CustomModal
            title="Please select the file format."
            modalStatus={modalStatus}
            handleConfirm={handleConfirm}
            hideCancelButton
          >
            <Grid
              container
              justifyContent="center"
              direction="column"
              className="custom-view__buttons"
            >
              <button
                type="button"
                className="nsw-button nsw-button--primary"
                onClick={() => handleDownloadDoc()}
              >
                <Grid container justifyContent="center" alignItems="center">
                  <img src={doc} alt="Doc icon" />
                  Download Word doc
                </Grid>
              </button>

              {/* TODO After mvp */}
              {/* <CSVLink */}
              {/*  data={CSVData} */}
              {/*  headers={CSVHeaders} */}
              {/*  filename="CustomView.csv" */}
              {/*  className="nsw-button nsw-button--primary" */}
              {/*  target="_blank" */}
              {/* > */}
              {/*  <Grid container justifyContent="center" alignItems="center"> */}
              {/*    <img src={excel} alt="Excel icon" /> */}
              {/*    Download CSV */}
              {/*  </Grid> */}
              {/* </CSVLink> */}
              <button
                type="button"
                className="nsw-button nsw-button--primary"
                onClick={() => handleDownloadPDF()}
              >
                <Grid container justifyContent="center" alignItems="center">
                  <img src={pdf} alt="PDF icon" />
                  Download PDF
                </Grid>
              </button>
              <DocumentTemplate ref={documentContentRef} {...documentProps} />
            </Grid>
          </CustomModal>
          <GeneratingOverlay modalStatus={generatingStatus} />
          <DocxHelpOverlay modalStatus={showDocxHelp} handleConfirm={handleCloseDocxHelp} />
        </>
      )}
    </>
  );
};

export default DownloadViewOverlay;
