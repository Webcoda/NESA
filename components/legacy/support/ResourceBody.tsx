import React from 'react';
import { Grid } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import ResourcesCard from '../card/ResourcesCard';
import { stripHtml } from '../../utilities/functions';
import { IResource } from '../../utilities/backendTypes';
import useSyllabusList from '../../utilities/hooks/useSyllabusList';
import { getSyllabusName } from '../../store/mock/syllabuses';
import { findStage } from '../../store/mock/stages';

interface ResourceBodyProps {
  filteredResources: IResource[];
  handleDownloadResource: (resource: IResource) => void;
}

const ResourceBody = (props: ResourceBodyProps): JSX.Element => {
  const { filteredResources, handleDownloadResource } = props;
  const allSyllabuses = useSyllabusList();

  return (
    <Grid container className="resource-page__body">
      <Grid container item spacing={3}>
        {filteredResources.map((resource, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={resource.code}>
            <ResourcesCard colour="primary">
              <Grid container item justifyContent="space-between" wrap="nowrap">
                <p className="resources-card__header">
                  {getSyllabusName(allSyllabuses, stripHtml(resource.syllabus_id))}
                </p>
                <p className="resources-card__year">
                  {new Date(resource.last_updated).getFullYear()}
                </p>
              </Grid>
              {resource.stageIds.map((stageId, stageIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={`resource-${index}_stage-id-${stageIndex}`}>
                  <p>{findStage(stageId).label}</p>
                </div>
              ))}
              <Grid container item justifyContent="flex-start" direction="column">
                <h2 className="resources-card__headline">{stripHtml(resource.title)}</h2>
                {/* {resource.summary && ( */}
                {/*  <p className="resources-card__body">{stripHtml(resource.summary)}</p> */}
                {/* )} */}
                <div className="resources-card__button-container">
                  <button
                    type="button"
                    className="button button--with-icon nsw-button nsw-button--secondary"
                    onClick={() => handleDownloadResource(resource)}
                  >
                    <span className="resources-card__pdf-icon">
                      <FontAwesomeIcon icon={faFilePdf} size="lg" />
                    </span>
                    Download resource
                    <span className="resources-card__download-icon">
                      <CloudDownloadIcon className="resource-card__download-icon" />
                    </span>
                  </button>
                </div>
              </Grid>
            </ResourcesCard>
          </Grid>
        ))}

        {filteredResources.length === 0 && (
          <Grid container justifyContent="center">
            Not found
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ResourceBody;
