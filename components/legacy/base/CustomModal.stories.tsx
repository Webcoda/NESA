import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CustomModal from './CustomModal';

const meta: ComponentMeta<typeof CustomModal> = {
  title: 'Components/Base/CustomModal',
  component: CustomModal,
  args: {
    title: 'Modal Title',
    modalStatus: false,
  },
};
export default meta;

const Template: ComponentStory<typeof CustomModal> = (args) => <CustomModal {...args} />;

export const Modal = Template.bind({});
