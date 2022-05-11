import React, { MouseEvent, useState } from 'react';
import { Grid } from '@material-ui/core';
import CustomModal from '../base/CustomModal';
import ChangeLogModal from './ChangeLogModal';
import { IChangeLog } from './LearningArea';
import { IStagesChangeLog, IStageVersionHistoryLog } from '../../pages/stages/StagesSyllabusPage';
import { ICustomVersionHistoryLog } from '../../pages/custom/CustomSyllabusPage';
import RadioButtonsList, { RadioButtonElement } from '../custom/RadioButtonsList';

export interface VersionHistoryLogModalProps {
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
  onCancel?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Function to be used on the Confirm button
   */
  onConfirm: (ids: string[]) => void;
  /**
   * List of version history log
   */
  versionHistoryLog?: RadioButtonElement[];
  /**
   * List of stages version history log
   */
  stagesVersionHistoryLog?: IStageVersionHistoryLog[];
  /**
   * List of stages version history log
   */
  customVersionHistoryLog?: ICustomVersionHistoryLog[];
  /**
   * List of change logs
   */
  changeLog?: IChangeLog;
  /**
   * List of stages change logs
   */
  stagesChangeLog?: IStagesChangeLog[];
}

/**
 * Version History Log Modal
 * @param props
 * @constructor
 */
const VersionHistoryLogModal = (props: VersionHistoryLogModalProps): JSX.Element => {
  const {
    title,
    onConfirm,
    onCancel,
    modalStatus,
    versionHistoryLog,
    stagesVersionHistoryLog,
    customVersionHistoryLog,
    changeLog,
    stagesChangeLog,
  } = props;

  const [showChangeLogModal, setShowChangeLogModal] = useState(false);
  const [selectedVersions, setSelectedVersions] = useState<Record<string, string>>({});

  const handleVersionSelect = (label: string) => (id: string) => {
    // TODO: Set the selected for setSelectedVersions state.
    // console.log({ selectedVersions: { ...selectedVersions, [label]: id }, id, label });
    setSelectedVersions({ ...selectedVersions, [label]: id });
  };

  const handleChangeLogOpen = () => {
    setShowChangeLogModal(true);
  };
  const handleChangeLogClose = () => {
    setShowChangeLogModal(false);
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(Object.values(selectedVersions));
    }
  };

  return (
    <div>
      <CustomModal
        title="Version History"
        modalStatus={modalStatus}
        handleConfirm={handleConfirm}
        handleCancel={onCancel}
        handleChangeLog={handleChangeLogOpen}
        showChangeLogButton
      >
        <Grid className="syllabus-header-dialog">
          {versionHistoryLog && (
            <div className="syllabus-header-dialog__tree-picker-wrapper">
              <RadioButtonsList
                options={versionHistoryLog}
                label="Version History Log"
                onChange={handleVersionSelect('Version History Log')}
                selected={selectedVersions['Version History Log']}
              />
            </div>
          )}
          {stagesVersionHistoryLog?.map((stageVersionHistoryLog: IStageVersionHistoryLog) => (
            <div
              key={`${stageVersionHistoryLog.name}-${stageVersionHistoryLog.id}`}
              className="syllabus-header-dialog__stage-version-history"
            >
              <h5>{stageVersionHistoryLog.name}</h5>
              <RadioButtonsList
                options={stageVersionHistoryLog.logs}
                label={stageVersionHistoryLog.name}
                onChange={handleVersionSelect(stageVersionHistoryLog.name)}
                selected={selectedVersions[stageVersionHistoryLog.name]}
              />
            </div>
          ))}
          {customVersionHistoryLog?.map((customLog: ICustomVersionHistoryLog, customLogIndex) => (
            <div
              key={`${customLog.name}-${customLog.id}`}
              className="syllabus-header-dialog__stage-version-history"
            >
              <h5>{customLog.name}</h5>
              {customLog.logs?.map((customHistoryLog: IStageVersionHistoryLog) => (
                <div
                  key={`${customHistoryLog.name}-${customHistoryLog.id}`}
                  className="syllabus-header-dialog__stage-version-history"
                >
                  <h5>{customHistoryLog.name}</h5>
                  <RadioButtonsList
                    options={customHistoryLog.logs}
                    label={customHistoryLog.name}
                    onChange={handleVersionSelect(customHistoryLog.name)}
                    selected={selectedVersions[customHistoryLog.name]}
                  />
                </div>
              ))}
              <hr />
            </div>
          ))}
        </Grid>
      </CustomModal>
      {showChangeLogModal && (
        <ChangeLogModal
          title="Change Log - English K–10 (2012)"
          handleConfirm={handleChangeLogClose}
          modalStatus={showChangeLogModal}
          changeLog={changeLog}
          stagesChangeLog={stagesChangeLog}
        />
      )}
    </div>
  );
};

export default VersionHistoryLogModal;
