import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Glossary from './Glossary';
import GlossariesJson from '../../service/json/glossaries.json';
import { convertGlossaries } from '../../service/syllabusService';

const sections = GlossariesJson.Items.map(convertGlossaries).sort((a, b) =>
  a.section.localeCompare(b.section),
);

const meta: ComponentMeta<typeof Glossary> = {
  title: 'Components/base/Glossary',
  component: Glossary,
  args: {
    sections,
  },
};
export default meta;

const Template: ComponentStory<typeof Glossary> = (props) => <Glossary {...props} />;

export const Default = Template.bind({});

export const NoAGroup = Template.bind({});
NoAGroup.args = {
  sections: sections.filter((s) => s.section !== 'a'),
};

export const NoTerms = Template.bind({});
NoTerms.args = {
  sections: [],
};

export const SearchResults = Template.bind({});
SearchResults.args = {
  startSearchTerm: 'language',
};

export const NoResults = Template.bind({});
NoResults.args = {
  startSearchTerm: 'Chemistry',
};

export const KlaFilter = Template.bind({});
KlaFilter.args = {
  klaFilter: 'English',
};
