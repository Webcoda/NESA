import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

export interface ILink {
  label: string;
  link: string;
  code: number;
  searchTags: string[];
}

export interface FileDownloadCardProps {
  /**
   * Title of card
   */
  title: string;

  /**
   * List of files
   */
  files: ILink[];
}

/**
 * Link and PDF Card
 * @param props
 * @constructor
 */
const FileDownloadCard = (props: FileDownloadCardProps): JSX.Element => {
  const { title, files } = props;

  const handleDownloadPDFList = () => {
    // TODO: handle download pdf
    // console.log('handleDownloadPDFList');
  };

  return (
    <Grid>
      <Paper className="link-and-pdf-card">
        <h4>{title}</h4>
        <Grid container className="link-and-pdf-card__links-content">
          {files.map((file) => (
            <Grid key={`${title}-${file.label}`} container className="download-list">
              <a
                href={file.link}
                target="__blank"
                className="download-list__link download-list__link--underlined"
              >
                {file.label}
              </a>
            </Grid>
          ))}
        </Grid>
        {files.length === 0 ?
          <Grid container>
            Not found
          </Grid>
          :
          <button
            type="button"
            className="button button--with-icon nsw-button nsw-button--secondary"
            onClick={handleDownloadPDFList}
          >
            <FontAwesomeIcon icon={faFilePdf} size="lg" />
            Download List
            <CloudDownloadIcon />
          </button>
        }
      </Paper>
    </Grid>
  );
};

export default FileDownloadCard;
