import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import CustomModal from '../base/CustomModal';
import FRONTEND from '../../constants/frontendConstants';
import TreePicker from '../custom/TreePicker';
import { TreeElement } from '../custom/treeUtils';
import { arrayToggleMultiple } from '../../utilities/functions';

export interface SubjectModalProps {
  /**
   * Modal title
   */
  title: string;
  /**
   * Show/Hide modal flag variable
   */
  modalStatus: boolean;
  /**
   * Function to be used on the Cancel button
   */
  onCancel?: () => void;
  /**
   * Function to be used on the Confirm button
   */
  onConfirm: (ids: string[]) => void;
  /**
   * Tree of subjects
   */
  subjectList: TreeElement[];
  /**
   * Initially selected subjects
   */
  initialSelection: string[];
}

/**
 * Subject Modal
 * @param props
 * @constructor
 */
const SubjectModal = (props: SubjectModalProps): JSX.Element => {
  const { title, onConfirm, onCancel, modalStatus, subjectList, initialSelection } = props;

  const [selected, setSelected] = useState(initialSelection);

  const handleSelectionChange = (ids: string[]) => {
    setSelected(arrayToggleMultiple(selected, ids));
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(selected);
    }
  };

  return (
    <div>
      <CustomModal
        title={title}
        modalStatus={modalStatus}
        handleConfirm={handleConfirm}
        handleCancel={onCancel}
        modalPosition={FRONTEND.MODAL_POSITION_LEFT}
      >
        <Grid className="syllabus-header-dialog">
          <TreePicker
            rootElements={subjectList}
            selected={selected}
            onChange={handleSelectionChange}
          />
        </Grid>
      </CustomModal>
    </div>
  );
};

export default SubjectModal;
