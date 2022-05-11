import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import ArrowButton from './ArrowButton';
import { Sections } from '../../constants/pathConstants';

const meta: ComponentMeta<typeof ArrowButton> = {
  title: 'Components/Base/ArrowButton',
  component: ArrowButton,
  decorators: [StoryRouter({}, { initialEntries: [Sections.STAGES.pages.PRIMARY.url] })],
  args: {
    title: Sections.STAGES.pages.PRIMARY.title,
    prefix: 'Years K – 6',
    path: Sections.STAGES.pages.PRIMARY.url,
  },
};

export default meta;

const Template: ComponentStory<typeof ArrowButton> = (args) => <ArrowButton {...args} />;

export const Default = Template.bind({});
