import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import GlossaryHeader from './GlossaryHeader';
import { alphabet } from '../../utilities/frontendTypes';

const meta: ComponentMeta<typeof GlossaryHeader> = {
  title: 'Components/Base/GlossaryHeader',
  component: GlossaryHeader,
};

export default meta;

const Template: ComponentStory<typeof GlossaryHeader> = (args) => <GlossaryHeader {...args} />;

export const Default = Template.bind({});

export const SomeDisabled = Template.bind({});
SomeDisabled.args = {
  disabled: alphabet.filter((_, index) => !(index % 2)),
};

export const AllDisabled = Template.bind({});
AllDisabled.args = {
  disabled: alphabet.slice(),
};

export const Selected = Template.bind({});
Selected.args = {
  selected: 'c',
};

export const SelectedDisabled = Template.bind({});
SelectedDisabled.args = {
  disabled: ['c'],
  selected: 'c',
};

export const HideExplanationText = Template.bind({});
HideExplanationText.args = {
  hideExplanationText: true,
};
