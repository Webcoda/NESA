import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectableButton from './SelectableButton';

const meta: ComponentMeta<typeof SelectableButton> = {
  title: 'Components/Base/SelectableButton',
  component: SelectableButton,
  args: {
    label: 'Title',
    buttonSelected: false,
  },
};

export default meta;

const Template: ComponentStory<typeof SelectableButton> = (args) => <SelectableButton {...args} />;

export const Default = Template.bind({});
export const Selected = Template.bind({});
Selected.args = {
  buttonSelected: true,
};
