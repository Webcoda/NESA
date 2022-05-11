import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import GlossaryHeader from './GlossaryHeader';
import { alphabet } from '../../utilities/frontendTypes';
import SearchBar from './SearchBar';

const meta: ComponentMeta<typeof SearchBar> = {
  title: 'Components/Base/SearchBar',
  component: SearchBar,
};

export default meta;

const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
