import React from 'react';
import { Grid } from '@material-ui/core';

interface CustomSyllabusHeaderProps {
  /**
   * Show/Hide bottom border
   */
  showBottomBorder?: boolean;
  /**
   * To hide Version History button
   */
  hideVersionHistoryButton?: boolean;
  /**
   * Whether to use the 'Edit Tags' message on edit button
   */
  useTagsMessage?: boolean;
  /**
   * Callback fired when version history is clicked
   */
  onVersionHistoryClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Callback fired when edit view is clicked
   */
  onEditViewClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomSyllabusHeader = (props: CustomSyllabusHeaderProps) => {
  const {
    showBottomBorder,
    hideVersionHistoryButton,
    useTagsMessage,
    onVersionHistoryClick,
    onEditViewClick,
  } = props;

  return (
    <div
      className={`syllabus-header ${
        showBottomBorder ? 'syllabus-header__title-with-bottom-border' : ''
      }`}
    >
      <Grid container className="syllabus-header__body">
        <Grid container item sm={12} md={6} alignItems="center">
          <div className="syllabus-header__tag">
            <h2>View</h2>
          </div>
          <Grid className="syllabus-header__titles">
            <h3 className="syllabus-header__main-title">Custom Syllabus</h3>
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
              <ErrorIcon className="syllabus-header__version-history-icon" /> Version History/Change
              Log
            </button>
          </Grid> */}
          <Grid>
            <button
              type="button"
              onClick={onEditViewClick}
              className="syllabus-header__edit-link button button--font-weight-100 button--font-size-14 nsw-button"
            >
              Edit {useTagsMessage ? 'tags' : 'view'}
            </button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomSyllabusHeader;
