import React from 'react';
import StoryRouter from 'storybook-react-router';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import MobileHeader, { PureMobileHeader } from './MobileHeader';
import { Sections } from '../../constants/pathConstants';
import Header from './Header';

const { HOME, LEARNING_AREAS, STAGES, TEACHING, RESOURCES, CUSTOM_VIEW } = Sections;
const links = { HOME, LEARNING_AREAS, STAGES, TEACHING, RESOURCES, CUSTOM_VIEW };

const meta: ComponentMeta<typeof Header> = {
  title: 'Components/Navigation/Header',
  component: Header,
  args: {},
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Main = Template.bind({});
Main.decorators = [StoryRouter({}, { initialEntries: ['/home'] })];

export const BreadCrumbs = Template.bind({});
BreadCrumbs.decorators = [StoryRouter({}, { initialEntries: [Sections.LEARNING_AREAS.url] })];
BreadCrumbs.args = {
  breadcrumbs: [Sections.HOME, Sections.LEARNING_AREAS],
};
