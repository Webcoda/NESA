import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import OutcomeDetailCard from './OutcomeDetailCard';

const meta: ComponentMeta<typeof OutcomeDetailCard> = {
  title: 'Components/Card/OutcomeDetailCard',
  component: OutcomeDetailCard,
  args: {
    content: [
      {
        content_group: 'Listening for understanding',
        rows: [
          {
            description:
              'recognise that people can communicate using verbal and nonverbal language',
            example: null,
            tags: ['Digital Literacy', 'Personal and social capability', 'Civics and citizenship'],
          },
          {
            description: 'understand 2-part spoken instructions',
            example: 'Get your book from my table and sit at your desk.',
            tags: [],
          },
          {
            description:
              'responds imaginatively and critically in an effective way to verbal and visual imagery',
            example: null,
            tags: [],
          },
          {
            description:
              'displays a developing personal style, composes with confidence, spoken, written, visual, ' +
              'multimodal and digital texts for a variety of purposes, audiences and contexts',
            example: null,
            tags: [],
          },
          {
            description:
              'is able to generalise from engaging with texts to present a range of views of the world',
            example: null,
            tags: [],
          },
          {
            description:
              'clearly demonstrates an understanding of the processes of composition, as they are able to ' +
              'make some inferences and interpretations, extend their imaginations in composing texts and ' +
              'adapt ideas into new and different contexts',
            example: null,
            tags: [],
          },
          {
            description:
              'with increasing confidence, is able to conform to, or challenge, an audience’s preconceptions ' +
              'and expectations',
            example: null,
            tags: [],
          },
          {
            description:
              'independently reflects on and uses, assesses and adapts their individual and ' +
              'collaborative skills for learning.',
            example: null,
            tags: [],
          },
        ],
      },
      {
        content_group: 'Social and learning interactions',
        rows: [
          {
            description: 'start and maintain a conversation with a peer, buddy or adult',
            example: null,
            tags: [],
          },
          {
            description: 'take turns when speaking during structured and unstructured play',
            example: null,
            tags: [],
          },
          {
            description:
              'recognise that people can communicate using verbal and nonverbal language',
            example: null,
            tags: ['Digital Literacy', 'Civics and citizenship'],
          },
          {
            description: 'understand 3-part spoken instructions',
            example: 'Get your book from my table and sit at your desk.',
            tags: [],
          },
          {
            description:
              'responds imaginatively and critically in an effective way to verbal and visual ' +
              'imagery',
            example: null,
            tags: [],
          },
          {
            description:
              'displays a developing personal style, composes with confidence, spoken, written, ' +
              'visual, multimodal and digital texts for a variety of purposes, audiences and contexts',
            example: null,
            tags: [],
          },
          {
            description:
              'is able to generalise from engaging with texts to present a range of views of the' +
              'world',
            example: null,
            tags: [],
          },
          {
            description:
              'clearly demonstrates an understanding of the processes of composition, as they are ' +
              'able to make some inferences and interpretations, extend their imaginations in ' +
              'composing texts and adapt ideas into new and different contexts',
            example: null,
            tags: [],
          },
          {
            description:
              'with increasing confidence, is able to conform to, or challenge, an audience’s ' +
              'preconceptions and expectations',
            example: null,
            tags: [],
          },
          {
            description:
              'independently reflects on and uses, assesses and adapts their individual and ' +
              'collaborative skills for learning.',
            example: null,
            tags: [],
          },
        ],
      },
    ],
    accessPoints: [{
      content_group: 'Listening for understanding',
      rows: [{
        description: 'respond to routine sounds and communications',
        example: 'Smiles in response to the teacher’s greeting or acknowledges the sound of the bell to start or end an activity.',
        tags: [],
      }] }],
  },
};

export default meta;

const Template: ComponentStory<typeof OutcomeDetailCard> = (args) => (
  <OutcomeDetailCard {...args} />
);
export const OutcomeDetail = Template.bind({});

export const Examples = Template.bind({});
Examples.args = {
  showExamples: true,
};

export const Tags = Template.bind({});
Tags.args = {
  showTags: ['Digital Literacy', 'Personal and social capability', 'Civics and citizenship'],
};

export const AccessPoints = Template.bind({});
AccessPoints.args = {
  showAccessPoints: true,
};

export const Title = Template.bind({});
Title.args = {
  title: 'Outcome Card',
};

export const Everything = Template.bind({});
Everything.args = {
  title: 'Outcome Card',
  showExamples: true,
  showTags: ['Digital Literacy', 'Personal and social capability', 'Civics and citizenship'],
  showAccessPoints: true,
};
