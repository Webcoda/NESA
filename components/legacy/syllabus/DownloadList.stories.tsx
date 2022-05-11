import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import DownloadList from './DownloadList';
import { convertResource } from '../../service/syllabusService';
import ResourcesJson from '../../service/json/resources.json';

const resources = ResourcesJson.Items.map(convertResource);

const meta: ComponentMeta<typeof DownloadList> = {
  title: 'Components/Syllabus/DownloadList',
  component: DownloadList,
  decorators: [
    StoryRouter({}, { initialEntries: ['/home'] }),
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
  args: {
    files: resources,
  },
  argTypes: {
    colour: {
      options: ['primary', 'secondary', null],
      control: { type: 'radio' },
    },
  },
};
export default meta;

const Template: ComponentStory<typeof DownloadList> = (props) => <DownloadList {...props} />;

export const Default = Template.bind({});
Default.args = {};

export const Primary = Template.bind({});
Primary.args = {
  colour: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  colour: 'secondary',
};
