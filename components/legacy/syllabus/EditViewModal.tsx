import React, { MouseEvent, useState } from 'react';
import { Grid } from '@material-ui/core';
import CustomModal from '../base/CustomModal';
import TreePicker from '../custom/TreePicker';
import { TreeElement } from '../custom/treeUtils';
import TagPicker from '../custom/TagPicker';
import { arrayToggleMultiple } from '../../utilities/functions';

export const syllabusTabTree: TreeElement[] = [
  {
    id: 'root',
    label: 'All Tabs',
    children: [
      {
        id: 'course-overview',
        label: 'Course overview',
      },
      {
        id: 'rationale',
        label: 'Rationale',
      },
      {
        id: 'aim',
        label: 'Aim',
      },
      {
        id: 'outcomes',
        label: 'Outcomes',
      },
      {
        id: 'content',
        label: 'Content',
      },
      {
        id: 'assessment',
        label: 'Assessment',
      },
      {
        id: 'glossary',
        label: 'Glossary',
      },
      {
        id: 'teaching-and-learning',
        label: 'Teaching and Learning',
      },
    ],
  },
];

export interface ViewSelection {
  tabs: string[];
  syllabuses?: string[];
  tags?: string[];
}

export interface EditViewModalProps {
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
  onConfirm: (selection: ViewSelection) => void;

  /**
   * Currently visible syllabus tabs
   */
  selectedTabs: string[];

  /**
   * Currently selected learning areas
   */
  selectedSyllabuses?: string[];

  /**
   * Tags currently selected;
   */
  selectedTags?: string[];

  /**
   * List of subjects
   */
  syllabusTree?: TreeElement[];
}

/**
 * Edit View Modal
 * @param props
 * @constructor
 */
const EditViewModal = (props: EditViewModalProps): JSX.Element => {
  const {
    title,
    onConfirm,
    onCancel,
    modalStatus,
    selectedTabs,
    selectedSyllabuses,
    selectedTags,
    syllabusTree,
  } = props;

  const [tabs, setTabs] = useState(selectedTabs);
  const [syllabuses, setSyllabuses] = useState(selectedSyllabuses);
  const [tags, setTags] = useState(selectedTags);

  const [showTabError, setShowTabError] = useState(false);
  const [showLAError, setShowLAError] = useState(false);
  const [showTagError, setShowTagError] = useState(false);

  const handleConfirm = (e: MouseEvent<HTMLButtonElement>) => {
    let tabError = false;
    let laError = false;
    let tagError = false;
    if (!selectedTags) {
      tabError = tabs.length === 0;
      setShowTabError(tabError);

      if (syllabuses) {
        laError = syllabuses.length === 0;
        setShowLAError(laError);
      }
    }

    if (selectedTags) {
      tagError = !tags || tags.length === 0;
      setShowTagError(tagError);
    }

    if (!tabError && !laError && !tagError) {
      onConfirm({
        tabs,
        syllabuses,
        tags,
      });
    }
  };

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    setShowTabError(false);
    setShowLAError(false);
    setShowTagError(false);

    if (onCancel) {
      onCancel(e);
    }
  };

  const handleTabChange = (ids: string[]) => {
    setTabs(arrayToggleMultiple(tabs, ids));
  };

  const handleLAChange = (ids: string[]) => {
    setSyllabuses(arrayToggleMultiple(syllabuses ?? [], ids));
  };

  const handleTagChange = (ids: string[]) => {
    setTags(arrayToggleMultiple(tags ?? [], ids));
  };

  return (
    <div>
      <CustomModal
        title={title}
        modalStatus={modalStatus}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      >
        <Grid className="syllabus-header-dialog">
          {showTabError && (
            <p className="syllabus-header-dialog__error">Must have at least one tab selected</p>
          )}
          {showLAError && (
            <p className="syllabus-header-dialog__error">Must have at least one area selected</p>
          )}
          {showTagError && (
            <p className="syllabus-header-dialog__error">Must have at least one tag selected</p>
          )}
          {!selectedTags && (
            <div className="syllabus-header-dialog__tree-picker-wrapper">
              <TreePicker
                rootElements={syllabusTabTree}
                selected={tabs}
                onChange={handleTabChange}
              />
              {syllabuses && syllabusTree && (
                <div>
                  <hr />
                  <TreePicker
                    rootElements={syllabusTree}
                    selected={syllabuses}
                    onChange={handleLAChange}
                  />
                </div>
              )}
            </div>
          )}
          {tags && (
            <div>
              <h5>Tags</h5>
              <TagPicker selected={tags} onChange={handleTagChange} />
            </div>
          )}
        </Grid>
      </CustomModal>
    </div>
  );
};

export default EditViewModal;
