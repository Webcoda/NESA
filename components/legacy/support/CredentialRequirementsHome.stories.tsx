import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import CredentialRequirementsHome from './CredentialRequirementsHome';

const meta: ComponentMeta<typeof CredentialRequirementsHome> = {
  title: 'Components/Support/CredentialRequirementsHome',
};
export default meta;

const Template: ComponentStory<typeof CredentialRequirementsHome> = (args) => (
  <CredentialRequirementsHome {...args} />
);

export const Main = Template.bind({});
