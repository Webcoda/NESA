import React, { MouseEvent, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import moment from 'moment';
import DOMPurify from 'dompurify';
import CustomModal from '../base/CustomModal';
import { IChangeLog, IChangeLogStage } from './LearningArea';
import { IStagesChangeLog } from '../../pages/stages/StagesSyllabusPage';
import TabPanel from '../tabs/TabPanel';
import TabBar from '../tabs/TabBar';
import useTabNavigation from '../../utilities/hooks/useTabNavigation';
import SYLLABUS from '../../constants/syllabusConstants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export interface ChangeLogModalProps {
  /**
   * Modal title
   */
  title: string;
  /**
   * Show/Hide modal flag variable
   */
  modalStatus: boolean;
  /**
   * Function to be used on the Confirm button
   */
  handleConfirm: (event: MouseEvent<HTMLButtonElement>) => void;
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
 * Change Log Modal
 * @param props
 * @constructor
 */
const ChangeLogModal = (props: ChangeLogModalProps): JSX.Element => {
  const { title, modalStatus, handleConfirm, changeLog, stagesChangeLog } = props;

  const classes = useStyles();

  const [tabValue, setTabValue] = useState('english');

  const handleTabChange = (newTabValue: string) => {
    setTabValue(newTabValue);
  };

  // console.log('changeLog ChangeLogModal: ', changeLog);

  const changeDetail = (stage: IChangeLogStage) => (
    <>
      <h5>{stage.name}</h5>
      <Grid className="syllabus-header-dialog__change-detail syllabus-header-dialog__change-detail--before">
        <Grid>
          <h5>Before</h5>
        </Grid>
        <Grid>
          <p>
            <span className="syllabus-header-dialog__change-detail-type">
              {`${stage.before.type}: `}
            </span>
            {stage.before.typeDescription}
          </p>
          <p>{stage.before.data}</p>
        </Grid>
      </Grid>
      <Grid className="syllabus-header-dialog__change-detail">
        <Grid>
          <h5>After</h5>
        </Grid>
        <Grid>
          <p>
            <span className="syllabus-header-dialog__change-detail-type">
              {`${stage.before.type}: `}
            </span>
            {stage.before.typeDescription}
          </p>
          <p>{stage.after.data}</p>
        </Grid>
      </Grid>
      <hr />
    </>
  );

  const changeDetailContainer = (currentChangeLog: IChangeLog | undefined) => (
    <div>
      {currentChangeLog && (
        <div>
          <div>
            <hr />
            <div className="syllabus-header-dialog__date">
              <CalendarTodayIcon />
              {moment(currentChangeLog?.date).format('DD MMMM yyyy')}
            </div>
            <hr />
          </div>
          <div
            className="syllabus-header-dialog__description-html"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(currentChangeLog.descriptionHTML),
            }}
          />
        </div>
      )}
      {currentChangeLog &&
        currentChangeLog.stages.map((stage, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`stage-${stage.id}-${index}`}
            className="syllabus-header-dialog__change-detail-container"
          >
            {changeDetail(stage)}
          </div>
        ))}
    </div>
  );

  const handleTabPrevious = () => {
    if (stagesChangeLog) {
      const newTab = useTabNavigation(stagesChangeLog, tabValue, 'PREVIOUS');
      if (newTab) {
        setTabValue(newTab?.id);
      }
    }
  };

  const handleTabNext = () => {
    if (stagesChangeLog) {
      const newTab = useTabNavigation(stagesChangeLog, tabValue, 'NEXT');
      if (newTab) {
        setTabValue(newTab?.id);
      }
    }
  };

  return (
    <CustomModal
      title={title}
      modalStatus={modalStatus}
      handleConfirm={handleConfirm}
      hideCancelButton
    >
      <Grid className="syllabus-header-dialog">
        {changeDetailContainer(changeLog)}
        {stagesChangeLog && (
          <div className="syllabus-overview-page">
            <div className="syllabus-header__tabs">
              <div className={`${classes.root}`}>
                <TabBar
                  value={tabValue}
                  onChange={handleTabChange}
                  tabClassName="syllabus-header__tab"
                  tabs={stagesChangeLog?.map((log) => ({
                    tabId: log.id.toString(),
                    panelId: `stage-panel-${log.id}`,
                    label: log.name,
                    className: `${
                      log.id === tabValue ? 'syllabus-header__tab-selected' : 'syllabus-header__tab'
                    }`,
                  }))}
                  className="syllabus-header__custom-tabs"
                  onPreviousClick={handleTabPrevious}
                  onNextClick={handleTabNext}
                  isModalTabBar
                />
                {stagesChangeLog?.map((log) => (
                  <TabPanel
                    key={log.id}
                    tabId={log.id.toString()}
                    panelId={`stage-panel-${log.id}`}
                  >
                    {changeDetailContainer(log.logs)}
                  </TabPanel>
                ))}
              </div>
            </div>
          </div>
        )}
      </Grid>
    </CustomModal>
  );
};

export default ChangeLogModal;
