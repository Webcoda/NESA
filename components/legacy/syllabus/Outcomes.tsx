import React, { useState } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { isMobile, isTablet, isIPad13, withOrientationChange } from 'react-device-detect';
import OutcomeCard from '../card/OutcomeCard';
import SYLLABUS from '../../constants/syllabusConstants';
import { AllStages } from '../../store/mock/stages';
import StageSelectOverlay from './StageSelectOverlay';
import { IOutcome, IStage } from '../../utilities/backendTypes';

export interface OutcomesProps {
  /**
   * Scroll offset for navigating
   */
  scrollOffset?: number;
  isLandscape?: boolean;
  outcomes?: IOutcome[];
}

const Outcomes = (props: OutcomesProps): JSX.Element => {
  const {
    scrollOffset = SYLLABUS.COMPARE_OUTCOME_SCROLL_OFFSET.LEARNING_AREA,
    isLandscape,
    outcomes,
  } = props;

  const [displayModal, setDisplayModal] = useState(false);
  const [displayBack, setDisplayBack] = useState(isMobile);
  const [nextButtonLabel, setNextButtonLabel] = useState('Stage 3');
  const [backButtonLabel, setBackButtonLabel] = useState('');
  const [nextCounter, setNextCounter] = useState(0);

  const divRef = React.useRef<HTMLDivElement>(null);
  const outcomeColumns = 3;

  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement>();

  const [activeStageIds, setActiveStageIds] = useState(
    AllStages.filter((s) => s.available).map((s) => s.id),
  );

  const stages = AllStages.filter((stage) => activeStageIds.includes(stage.id));
  const [currentStage, setCurrentStage] = useState<IStage>(stages[0]);

  const handleBack = () => {
    // console.log('handleBack');
    if (divRef && divRef.current && (!isMobile || isLandscape)) {
      // off set to the left based on the width of the card + margin
      divRef.current.scrollLeft -= scrollOffset;

      // temp for the next button clicks, so we can track back the clicks as well.
      let tempCounter = nextCounter;
      if (stages.length > 0 && tempCounter < stages.length) {
        tempCounter -= 1;
        setNextCounter(tempCounter);

        // find out the previous stage(hidden) so we can update the button label.
        let previousStage = 0;
        stages.forEach((current, index) => {
          if (current.label === backButtonLabel && index > 0) {
            previousStage = index - 1;
          }
        });
        // if there is a label still then we update, otherwise we disable the back button
        if (tempCounter >= 0) setBackButtonLabel(stages[previousStage].label);
        else setDisplayBack(false);

        // since there are 3 elements showing everytime,
        // we need to add to the click to display the next button
        const elementsHidden = tempCounter + outcomeColumns;
        if (elementsHidden < stages.length) setNextButtonLabel(stages[elementsHidden].label);
        else setNextButtonLabel('');

        if (tempCounter > 0) setDisplayBack(true);
        else setDisplayBack(false);
      }
    } else {
      /*
        For mobile devices, since we are just displaying one col
        Im just displaying the currentStage
      */
      let tempCounter = nextCounter;
      if (stages.length > 0 && tempCounter < stages.length) {
        if (tempCounter > 0) tempCounter -= 1;
        setCurrentStage(stages[tempCounter]);
        setNextCounter(tempCounter);
      }
    }
  };

  const handleForward = () => {
    if (divRef && divRef.current && (!isMobile || isLandscape)) {
      // off set to the left based on the width of the card + margin
      divRef.current.scrollLeft += scrollOffset;

      let tempCounter = nextCounter;
      if (stages.length > 0 && tempCounter < stages.length && tempCounter < outcomeColumns) {
        // update the button label/name
        setBackButtonLabel(stages[tempCounter].label);

        tempCounter += 1;
        setNextCounter(tempCounter);

        // since there are 3 elements showing everytime,
        // we need to add to the click to display the next button
        const elementsHidden = tempCounter + outcomeColumns;
        if (elementsHidden < stages.length) setNextButtonLabel(stages[elementsHidden].label);
        else setNextButtonLabel('');

        if (tempCounter > 0) setDisplayBack(true);
        else setDisplayBack(false);
      }
    } else {
      /*
        For mobile devices, since we are just displaying one col
        Im just displaying the currentStage
      */
      let tempCounter = nextCounter;
      if (stages.length > 0 && tempCounter < stages.length - 1) {
        tempCounter += 1;
        setCurrentStage(stages[tempCounter]);
        setNextCounter(tempCounter);
      }
    }
  };

  const handleStageSelection = (ids: string[]) => {
    const newOutcomes = AllStages.filter((stage) => ids.includes(stage.id));

    if (newOutcomes.length > outcomeColumns) {
      setNextButtonLabel(newOutcomes[outcomeColumns].label);
    } else {
      setNextButtonLabel('');
    }

    setBackButtonLabel('');

    // Reset outcomes position
    if (divRef && divRef.current && !isMobile) {
      divRef.current.scrollLeft -= scrollOffset * nextCounter;
      setNextCounter(0);
    }

    setActiveStageIds(ids);
    setDisplayModal(false);

    if (isMobile) {
      /*
        For mobile devices, since we are just displaying one col
        Im just displaying the currentStage
      */
      if (newOutcomes.length === 1) {
        setCurrentStage(newOutcomes[0]);
      }
    }
  };

  const handleStageOverlayClose = () => {
    setDisplayModal(false);
  };

  const handleStageOverlayToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDisplayModal(!displayModal);
    setPopoverAnchor(event.currentTarget);
  };

  const uniqueOutcomes = outcomes
    ?.flatMap((group) =>
      group.outcomes.map((o) => ({
        ...o,
        stageIds: group.stageIds,
      })),
    )
    .filter((outcome, i, list) => list.findIndex((o) => o.key === outcome.key) === i);

  return (
    <Grid className="outcomes" container item xs={12}>
      <Grid container item xs={12} className="outcomes__compare">
        <button
          type="button"
          className="button nsw-button nsw-button--secondary"
          onClick={(e) => handleStageOverlayToggle(e)}
        >
          Compare Stage Outcomes
        </button>
      </Grid>
      {stages && stages.length > 3 && (!isMobile || isLandscape) && (
        <Grid container item xs={12} justifyContent="space-between" className="outcomes__buttons">
          <div className="row align-items-center">
            {displayBack && backButtonLabel && (
              <IconButton className="outcomes__stages__button" onClick={handleBack}>
                <ArrowBackIos />
              </IconButton>
            )}
            {backButtonLabel && displayBack && !isLandscape && (
              <h3 className="outcomes__stages-nav-label">{backButtonLabel}</h3>
            )}
          </div>
          {stages.length > outcomeColumns && (
            <div className="row align-items-center">
              {nextButtonLabel && !isLandscape && (
                <h3 className="outcomes__stages-nav-label">{nextButtonLabel}</h3>
              )}

              {nextButtonLabel && (
                <IconButton className="outcomes__stages__button" onClick={handleForward}>
                  <ArrowForwardIos />
                </IconButton>
              )}
            </div>
          )}
        </Grid>
      )}
      <div className="outcomes__wrapper" ref={divRef}>
        {(!isMobile || isLandscape || isTablet) &&
          stages.map((stage, index) => (
            <div
              className={`outcomes__stages
                ${
                  scrollOffset === SYLLABUS.COMPARE_OUTCOME_SCROLL_OFFSET.STAGES
                    ? 'outcomes__stages--stage-page'
                    : ''
                }
                ${
                  scrollOffset === SYLLABUS.COMPARE_OUTCOME_SCROLL_OFFSET.CUSTOM_PAGE
                    ? 'outcomes__stages--custom-page'
                    : ''
                }
                `}
              key={stage.id}
            >
              <div
                className={`${
                  index > 0
                    ? 'outcomes__stages__row justify-content-space-between'
                    : 'outcomes__stages__row'
                }`}
              >
                <h1>{stage.label}</h1>
              </div>

              <div className="outcomes__stages-outcome-card-wrapper">
                {uniqueOutcomes
                  ?.filter((o) => o.stageIds.includes(stage.id))
                  .map((outcome) => (
                    <OutcomeCard
                      key={outcome.key}
                      title={outcome.key}
                      displayOutcome={false}
                      outcomes={[outcome.value]}
                    />
                  ))}
              </div>
            </div>
          ))}
        {isMobile && !isLandscape && currentStage && !isTablet && (
          <div className="outcomes__stages" key={currentStage.id}>
            <div className="outcomes__stages__row">
              <IconButton className="outcomes__stages__button" onClick={handleBack}>
                <ArrowBackIos />
              </IconButton>
              <h1>{currentStage.label}</h1>
              <IconButton className="outcomes__stages__button" onClick={handleForward}>
                <ArrowForwardIos />
              </IconButton>
            </div>
            <div className="outcomes__stages-outcome-card-wrapper">
              {uniqueOutcomes
                ?.filter((o) => o.stageIds.includes(currentStage.id))
                .map((outcome) => (
                  <OutcomeCard
                    key={outcome.key}
                    title={outcome.key}
                    displayOutcome={false}
                    outcomes={[outcome.value]}
                  />
                ))}
            </div>
          </div>
        )}
      </div>

      {displayModal && (
        <StageSelectOverlay
          selected={activeStageIds}
          title="Include Stages"
          popoverStatus={displayModal}
          popoverAnchor={popoverAnchor}
          onConfirm={handleStageSelection}
          onCancel={handleStageOverlayClose}
        />
      )}
    </Grid>
  );
};

export default withOrientationChange(Outcomes);
