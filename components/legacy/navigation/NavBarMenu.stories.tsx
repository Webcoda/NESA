import React from 'react';
import StoryRouter from 'storybook-react-router';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import NavBarMenuSection from './NavBarMenu';
import { Sections } from '../../constants/pathConstants';
import {
  globalSupport,
  learningAreas,
  stagesPrimary,
  stagesSecondary,
  stagesSenior,
  syllabusSupport,
} from '../../utilities/hooks/useNavGroups';

const meta: ComponentMeta<typeof NavBarMenuSection> = {
  title: 'Components/Navigation/NavBarMenu',
  component: NavBarMenuSection,
  args: {},
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    layout: 'centered',
  },
  decorators: [StoryRouter({}, { initialEntries: [Sections.HOME.url] })],
};
export default meta;

const Template: ComponentStory<typeof NavBarMenuSection> = (args) => (
  <NavBarMenuSection {...args} />
);

export const LearningAreas = Template.bind({});
LearningAreas.args = {
  sections: [learningAreas],
};

export const Resources = Template.bind({});
Resources.args = {
  sections: [syllabusSupport, globalSupport],
};

export const Stages = Template.bind({});
Stages.args = {
  sections: [stagesPrimary, stagesSecondary, stagesSenior],
};
