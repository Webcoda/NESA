import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import DownloadButton from './DownloadButton';

const meta: ComponentMeta<typeof DownloadButton> = {
  title: 'Components/base/DownloadButton',
  component: DownloadButton,
  args: {
    attachments: [
      {
        src: 'https://data.nsw.gov.au/data/dataset/bc0a3d68-52ab-4110-acf9-d3bc3769b8ca/resource/20987c6c-418d-46b0-87eb-94152983008f/download/dataqualitytoolstatement21-6-2016.pdf',
        filename: 'Document.pdf',
      },
    ],
    children: 'Download',
  },
};
export default meta;

const Template: ComponentStory<typeof DownloadButton> = (props) => <DownloadButton {...props} />;

export const Succeeds = Template.bind({});

export const Errors = Template.bind({});
Errors.args = {
  attachments: [
    {
      src: '',
      filename: 'Document.pdf',
    },
  ],
};

export const IncludesFileTypeIcon = Template.bind({});
IncludesFileTypeIcon.args = {
  children: (
    <>
      <FontAwesomeIcon icon={faFilePdf} size="lg" />
      Download
    </>
  ),
};
