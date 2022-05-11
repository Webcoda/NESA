import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import SiteFooter from './SiteFooter';

const meta: ComponentMeta<typeof SiteFooter> = {
  title: 'Components/Navigation/SiteFooter',
  component: SiteFooter,
};
export default meta;

const Template: ComponentStory<typeof SiteFooter> = () => <SiteFooter />;

export const Home = Template.bind({});
