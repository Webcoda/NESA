import React, { useEffect, useRef, useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import DOMPurify from 'dompurify';
import { ISyllabusTag, ISyllabusTags } from '../../pages/custom/CustomSyllabusPage';
import SelectableButton from '../base/SelectableButton';
import SyllabusContentSection from './SyllabusContentSection';
import SanitisedHTMLContainer from '../base/SanitisedHTMLContainer';

export interface SyllabusTagViewerProps {
  tags: ISyllabusTag[];
  onTagClick?: (name: string) => void;
}

const SyllabusTagViewer = (props: SyllabusTagViewerProps): JSX.Element => {
  const { tags, onTagClick } = props;

  const [selectedTag, setSelectedTag] = useState<ISyllabusTag | null>(
    tags.length > 0 ? tags[0] : null,
  );
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const handleTagSelect = (itemTag: ISyllabusTag) => () => {
    setSelectedTag(itemTag);
  };

  useEffect(() => {
    if (!bodyRef.current) {
      console.error('Tried to add tag click handler with no ref to body.');
      return () => {};
    }

    /*
     * Getting all the tags elements and adding click event
     */
    const tagBadges = bodyRef.current.getElementsByClassName('tag');
    const pairs: [Element, () => void][] = [];

    for (let i = 0; i < tagBadges.length; i += 1) {
      const currentElement = tagBadges[i];
      const handler = () => {
        if (onTagClick) {
          onTagClick(currentElement.innerHTML);
        }
      };

      currentElement.addEventListener('click', handler);
      pairs.push([currentElement, handler]);
    }

    /*
     * Cleaning up click events
     */
    return () => {
      pairs.map(([e, h]) => e.removeEventListener('click', h));
    };
  });

  return (
    <Grid container ref={bodyRef}>
      <Grid container item xs={12} sm={4} md={3} direction="column">
        {/* tags data */}
        {tags.length > 0 ? (
          tags.map((itemTag: ISyllabusTag) => (
            <div key={itemTag.id} className="nsw-m-right-sm">
              <SelectableButton
                key={itemTag.learningArea}
                label={itemTag.learningArea}
                buttonSelected={itemTag === selectedTag}
                onClick={handleTagSelect(itemTag)}
              />
            </div>
          ))
        ) : (
          <div className="nsw-m-right-sm">
            <p>Not available</p>
          </div>
        )}
      </Grid>
      {selectedTag && (
        <Grid item xs={12} sm={8} md={9}>
          <Paper className="outcome-detail-card nsw-p-sm nsw-p-bottom-lg custom-syllabus-card">
            {selectedTag.tagList.map((tagContent) => (
              <>
                <SanitisedHTMLContainer>
                  {tagContent.contentGroup}
                </SanitisedHTMLContainer>
                <div className="custom-syllabus-card__list">
                  <ul>
                    <li>
                      {tagContent.description.map((description) => (
                        <SanitisedHTMLContainer>
                          {description}
                        </SanitisedHTMLContainer>
                      ))}
                    </li>
                  </ul>
                  <div className="tags">
                    <div className="tag">{selectedTag.id}</div>
                  </div>
                </div>
              </>
            ))}
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default SyllabusTagViewer;
