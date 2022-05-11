import React from 'react';
import StoryRouter from 'storybook-react-router';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import NavBar, { PureNavBar } from './NavBar';
import { NavGroupSection } from '../../utilities/hooks/useNavGroups';
import { Sections } from '../../constants/pathConstants';
import { UrlLink } from '../../utilities/frontendTypes';

const stagesPrimary: NavGroupSection = {
  label: Sections.STAGES.pages.PRIMARY.title,
  links: [
    Sections.STAGES.pages.PRIMARY.sub_pages.EARLY_STAGE_1,
    Sections.STAGES.pages.PRIMARY.sub_pages.STAGE_1,
    Sections.STAGES.pages.PRIMARY.sub_pages.STAGE_2,
    Sections.STAGES.pages.PRIMARY.sub_pages.STAGE_3,
    {
      url: Sections.STAGES.pages.PRIMARY.url,
      title: 'View all',
      isDisabled: true, // TODO: Remove after MVP
    },
  ] as UrlLink[],
} as const;

const stagesSecondary: NavGroupSection = {
  label: Sections.STAGES.pages.SECONDARY.title,
  links: [
    Sections.STAGES.pages.SECONDARY.sub_pages.STAGE_4,
    Sections.STAGES.pages.SECONDARY.sub_pages.STAGE_5,
    {
      url: Sections.STAGES.pages.SECONDARY.url,
      title: 'View all',
      isDisabled: true, // TODO: Remove after MVP
    },
  ] as UrlLink[],
} as const;

const stagesSenior: NavGroupSection = {
  label: Sections.STAGES.pages.SENIOR.title,
  links: [
    Sections.STAGES.pages.SENIOR.sub_pages.STAGE_6,
    {
      url: Sections.STAGES.pages.SENIOR.url,
      title: 'View all',
      isDisabled: true, // TODO: Remove after MVP
    },
  ] as UrlLink[],
} as const;

const learningAreas: NavGroupSection = {
  label: Sections.LEARNING_AREAS.title,
  links: [
    Sections.LEARNING_AREAS.pages.ENGLISH,
    Sections.LEARNING_AREAS.pages.MATHEMATICS,
    Sections.LEARNING_AREAS.pages.HSIE,
    Sections.LEARNING_AREAS.pages.CREATIVE_ARTS,
    Sections.LEARNING_AREAS.pages.PDHPE,
    Sections.LEARNING_AREAS.pages.LANGUAGES,
    Sections.LEARNING_AREAS.pages.SCIENCE,
    Sections.LEARNING_AREAS.pages.TECHNOLOGIES,
    // Sections.LEARNING_AREAS.pages.VET,
  ] as UrlLink[],
} as const;

const teachingAndLearning: NavGroupSection = {
  label: Sections.TEACHING.title,
  links: [
    Sections.TEACHING.pages.INTRODUCTION,
    Sections.TEACHING.pages.NSW_CURRICULUM,
    Sections.TEACHING.pages.PLACE,
    Sections.TEACHING.pages.DIVERSITY,
    Sections.TEACHING.pages.ABORIGINAL,
    // TODO: Enable after MVP
    // Sections.TEACHING.pages.SAFETY,
    Sections.TEACHING.pages.PROGRAMMING,
    Sections.TEACHING.pages.ASSESSMENT,
    Sections.TEACHING.pages.REPORTING,
    Sections.TEACHING.pages.LEARNING_ACROSS_CUR,
  ] as UrlLink[],
} as const;

const syllabusSupport: NavGroupSection = {
  label: Sections.SYLLABUS_SUPPORT.title,
  links: [
    Sections.SYLLABUS_SUPPORT.pages.INTRODUCTION,
    Sections.SYLLABUS_SUPPORT.pages.ADVICE,
    Sections.SYLLABUS_SUPPORT.pages.RESOURCES,
    // TODO: Add after MVP
    // Sections.SYLLABUS_SUPPORT.pages.GRADED_WORK,
    // Sections.SYLLABUS_SUPPORT.pages.STANDARDS_MATERIALS,
    // Sections.SYLLABUS_SUPPORT.pages.PAST_HSC,
  ] as UrlLink[],
} as const;

const globalSupport: NavGroupSection = {
  label: Sections.GLOBAL_SUPPORT.title,
  links: [
    // TODO: Add after MVP
    // Sections.GLOBAL_SUPPORT.pages.SUGGESTED_TEXTS,
    Sections.GLOBAL_SUPPORT.pages.GLOSSARY,
    // Sections.GLOBAL_SUPPORT.pages.PARENT_GUIDE,
    // TODO: Add after MVP
    // Sections.GLOBAL_SUPPORT.pages.CREDENTIAL_REQ,
  ] as UrlLink[],
} as const;

export const destinations = [
  {
    id: 'home',
    label: Sections.HOME.title,
    url: Sections.HOME.url,
  },
  {
    id: 'learningAreas',
    label: Sections.LEARNING_AREAS.title,
    url: Sections.LEARNING_AREAS.url,
    sections: [learningAreas],
  },
  {
    id: 'stages',
    label: Sections.STAGES.title,
    url: Sections.STAGES.url,
    sections: [stagesPrimary, stagesSecondary, stagesSenior],
  },
  {
    id: 'teaching-and-learning',
    label: Sections.TEACHING.title,
    url: Sections.TEACHING.url,
    sections: [teachingAndLearning],
  },
  {
    id: 'resources',
    label: Sections.RESOURCES.title,
    url: Sections.RESOURCES.url,
    sections: [syllabusSupport, globalSupport],
  },
  {
    id: 'custom',
    label: Sections.CUSTOM_VIEW.title,
    url: Sections.CUSTOM_VIEW.url,
    icon: Sections.CUSTOM_VIEW.icon,
  },
];

const meta: ComponentMeta<typeof PureNavBar> = {
  title: 'Components/Navigation/NavBar',
  component: PureNavBar,
  args: {
    destinations,
  },
  excludeStories: ['destinations'],
};
export default meta;

const Template: ComponentStory<typeof PureNavBar> = (args) => <PureNavBar {...args} />;

export const Home = Template.bind({});
Home.decorators = [StoryRouter({}, { initialEntries: ['/home'] })];

export const LearningAreas = Template.bind({});
LearningAreas.decorators = [StoryRouter({}, { initialEntries: ['/learning'] })];

export const SearchMode = Template.bind({});
SearchMode.decorators = [StoryRouter({}, { initialEntries: ['/home'] })];
SearchMode.args = {
  search: true,
};

const FullImpl: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;
export const FullImplementation = FullImpl.bind({});
FullImplementation.decorators = [StoryRouter({}, { initialEntries: ['/home'] })];
