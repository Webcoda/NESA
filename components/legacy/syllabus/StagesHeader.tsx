import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/core/styles';
import SyllabusStagesHeader from './SyllabusStagesHeader';
import { ILearningArea } from '../../utilities/backendTypes';
import { KlaIds } from '../../store/mock/keyLearningAreas';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export interface StagesHeaderProps {
  /**
   * Subject tag
   */
  tag: string;
  /**
   * Subject title
   */
  title: string;
  /**
   * Subject tag
   */
  learningAreas: ILearningArea[];
  /**
   * Callback fired when version history is clicked
   */
  onVersionHistoryClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Callback fired when edit view is clicked
   */
  onEditViewClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * List of selected stages, both primary and secondary
   */
  selectedStages: string[];
  /**
   * Learning area
   */
  area: string;
  /**
   * Fire when Stages Header popover confirm button clicked
   */
  onStagesHeaderConfirm: (ids: string[]) => void;
}

/**
 * Stages Header
 * @param props
 * @constructor
 */
const StagesHeader = (props: StagesHeaderProps): JSX.Element => {
  const {
    tag,
    title,
    learningAreas,
    onVersionHistoryClick,
    onEditViewClick,
    selectedStages,
    area,
    onStagesHeaderConfirm,
  } = props;

  const classes = useStyles();

  const [tabValue, setTabValue] = useState('0');

  const handleTabChange = (newTabValue: string) => {
    setTabValue(newTabValue);
  };

  return (
    <div className="syllabus-header">
      <div className="syllabus-header__body">
        <Grid container>
          <Grid container item sm={12} md={6} alignItems="center">
            <div className="syllabus-header__tag">
              <h2>{tag}</h2>
            </div>
            <Grid className="syllabus-header__titles">
              <SyllabusStagesHeader
                title={title}
                selectedStages={selectedStages}
                area={area}
                isMainHeader
                onStagesHeaderConfirm={onStagesHeaderConfirm}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            sm={12}
            md={6}
            alignItems="center"
            className="syllabus-header__select-right"
          >
            {/* TODO: Enable after MVP */}
            {/* <Grid>
              <button
                type="button"
                onClick={onVersionHistoryClick}
                className="syllabus-header__version-history button button--font-size-14 nsw-button"
              >
                <ErrorIcon className="syllabus-header__version-history-icon" /> Version
                Version History/Change Log
              </button>
            </Grid> */}
            <Grid>
              <button
                type="button"
                onClick={onEditViewClick}
                className="syllabus-header__edit-link button button--font-weight-100 button--font-size-14 nsw-button"
              >
                Edit view
              </button>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className="syllabus-header__select-wrapper">
        <div className="syllabus-header__subjects">
          <div className="syllabus-header__tabs stages-header">
            <div className={`${classes.root}`}>
              <Tabs
                value={false}
                indicatorColor="secondary"
                variant="scrollable"
                aria-label="Scrollable detail header"
                style={{ background: '#F4F4F7' }}
              >
                <div className="custom-tabs">
                  {learningAreas
                    .filter((e) => e.id !== KlaIds.vet)
                    .map((subject) => (
                      <div
                        className={`custom-tab ${
                          tabValue === subject.id ? 'custom-tab--selected' : ''
                        }`}
                        key={subject.id}
                        role="tab"
                      >
                        {/* TODO: Enable after MVP */}
                        {/* <a
                        href={`#${subject.id}`}
                        className="nsw-link"
                        onClick={() => handleTabChange(subject.id)}
                        role="button"
                        tabIndex={subject.index}
                      >
                        <h4>{subject.label}</h4>
                      </a> */}
                        {/* TODO: Remove after MVP */}
                        {subject.available ? (
                          <a
                            href={`#${subject.id}`}
                            className="nsw-link"
                            onClick={() => handleTabChange(subject.id)}
                            role="button"
                          >
                            <h4>{subject.title}</h4>
                          </a>
                        ) : (
                          <h4 className="custom-tab--disabled">{subject.title}</h4>
                        )}
                      </div>
                    ))}
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StagesHeader;
