import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TreePicker, { PureTreePicker } from './TreePicker';
import { TreeElement } from './treeUtils';

const meta: ComponentMeta<typeof TreePicker> = {
  title: 'Components/Custom/TreePicker',
  args: {},
  argTypes: {
    onToggle: { action: 'Toggled' },
    onExpand: { action: 'Expand Toggled' },
    onChange: { action: 'Toggled' },
  },
};
export default meta;

const PureTemplate: ComponentStory<typeof PureTreePicker> = (args) => <PureTreePicker {...args} />;
PureTemplate.argTypes = {
  onToggle: { action: 'Toggled' },
  onExpand: { action: 'Expand Toggled' },
};

const FunctionalTemplate: ComponentStory<typeof TreePicker> = (args) => <TreePicker {...args} />;
FunctionalTemplate.argTypes = {
  onChange: { action: 'Toggled' },
};

export const NoSelected = PureTemplate.bind({});
NoSelected.args = {
  rootElements: [
    {
      id: 'all',
      label: 'All stages',
      children: [
        {
          id: 'early-stage-1',
          label: 'Early Stage 1',
        },
        {
          id: 'stage-1',
          label: 'Stage 1',
        },
        {
          id: 'stage-2',
          label: 'Stage 2',
        },
        {
          id: 'stage-3',
          label: 'Stage 3',
        },
        {
          id: 'stage-4',
          label: 'Stage 4',
        },
        {
          id: 'stage-5',
          label: 'Stage 5',
        },
        {
          id: 'stage-6',
          label: 'Stage 6',
        },
      ],
    },
  ],
  selected: [],
  collapsed: ['all'],
};

export const AllSelected = PureTemplate.bind({});
AllSelected.args = {
  rootElements: [
    {
      id: 'all',
      label: 'All stages',
      children: [
        {
          id: 'early-stage-1',
          label: 'Early Stage 1',
        },
        {
          id: 'stage-1',
          label: 'Stage 1',
        },
        {
          id: 'stage-2',
          label: 'Stage 2',
        },
        {
          id: 'stage-3',
          label: 'Stage 3',
        },
        {
          id: 'stage-4',
          label: 'Stage 4',
        },
        {
          id: 'stage-5',
          label: 'Stage 5',
        },
        {
          id: 'stage-6',
          label: 'Stage 6',
        },
      ],
    },
  ],
  selected: ['early-stage-1', 'stage-1', 'stage-2', 'stage-3', 'stage-4', 'stage-5', 'stage-6'],
  collapsed: ['all'],
};

export const IndeterminateRoot = PureTemplate.bind({});
IndeterminateRoot.args = {
  rootElements: [
    {
      id: 'all',
      label: 'All stages',
      children: [
        {
          id: 'early-stage-1',
          label: 'Early Stage 1',
        },
        {
          id: 'stage-1',
          label: 'Stage 1',
        },
        {
          id: 'stage-2',
          label: 'Stage 2',
        },
        {
          id: 'stage-3',
          label: 'Stage 3',
        },
        {
          id: 'stage-4',
          label: 'Stage 4',
        },
        {
          id: 'stage-5',
          label: 'Stage 5',
        },
        {
          id: 'stage-6',
          label: 'Stage 6',
        },
      ],
    },
  ],
  selected: ['stage-1', 'stage-2', 'stage-3'],
  collapsed: ['all'],
};

export const MultiLevel = PureTemplate.bind({});
MultiLevel.args = {
  rootElements: [
    {
      id: 'all',
      label: 'All syllabus elements',
      children: [
        {
          id: 'curriculum',
          label: 'All curriculum elements',
          children: [
            {
              id: 'course-overview',
              label: 'Course Overview',
            },
            {
              id: 'Rationale',
              label: 'Rationale',
            },
            {
              id: 'Aim',
              label: 'Aim',
            },
            {
              id: 'Outcomes',
              label: 'Outcomes',
            },
            {
              id: 'content',
              label: 'Content',
              children: [
                {
                  id: 'Teaching Advice',
                  label: 'Teaching Advice',
                },
                {
                  id: 'Examples',
                  label: 'Examples',
                },
                {
                  id: 'Tags',
                  label: 'Tags',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  selected: ['Aim', 'Teaching Advice'],
  collapsed: ['Content Organisers + Linked Content'],
};

export const Functional = FunctionalTemplate.bind({});
Functional.args = {
  rootElements: [
    {
      id: 'all',
      label: 'All syllabus elements',
      children: [
        {
          id: 'curriculum',
          label: 'All curriculum elements',
          children: [
            {
              id: 'course-overview',
              label: 'Course Overview',
            },
            {
              id: 'Rationale',
              label: 'Rationale',
            },
            {
              id: 'Aim',
              label: 'Aim',
            },
            {
              id: 'Outcomes',
              label: 'Outcomes',
            },
            {
              id: 'content',
              label: 'Content',
              children: [
                {
                  id: 'Teaching Advice',
                  label: 'Teaching Advice',
                },
                {
                  id: 'Examples',
                  label: 'Examples',
                },
                {
                  id: 'Tags',
                  label: 'Tags',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  selected: [],
};

export const PreSelectedNodes = FunctionalTemplate.bind({});
PreSelectedNodes.args = {
  rootElements: [
    {
      id: 'all',
      label: 'All nodes',
      children: [
        {
          id: 'none',
          label: 'Nothing set',
          children: [
            {
              id: 'none-1',
              label: 'Not set 1',
            },
            {
              id: 'none-2',
              label: 'Not set 2',
            },
            {
              id: 'none-3',
              label: 'Not set 3',
            },
          ],
        },
        {
          id: 'single',
          label: 'Single Child set true',
          children: [
            {
              id: 'single-1',
              label: 'Not set 1',
            },
            {
              id: 'single-2',
              label: 'Set true 2',
            },
            {
              id: 'single-3',
              label: 'Not set 3',
            },
          ],
        },
        {
          id: 'allSelected',
          label: 'All Children set true',
          children: [
            {
              id: 'allSelected-1',
              label: 'Set true 1',
            },
            {
              id: 'allSelected-2',
              label: 'Set true 2',
            },
            {
              id: 'allSelected-3',
              label: 'Set true 3',
            },
          ],
        },
      ],
    },
  ],
  selected: ['single-2', 'allSelected-1', 'allSelected-2', 'allSelected-3'],
};

export const ExpandedAll = FunctionalTemplate.bind({});
ExpandedAll.args = {
  rootElements: [
    {
      id: 'all',
      label: 'All syllabus elements',
      children: [
        {
          id: 'curriculum',
          label: 'All curriculum elements',
          children: [
            {
              id: 'course-overview',
              label: 'Course Overview',
            },
            {
              id: 'Rationale',
              label: 'Rationale',
            },
            {
              id: 'Aim',
              label: 'Aim',
            },
            {
              id: 'Outcomes',
              label: 'Outcomes',
            },
            {
              id: 'content',
              label: 'Content',
              children: [
                {
                  id: 'Teaching Advice',
                  label: 'Teaching Advice',
                },
                {
                  id: 'Examples',
                  label: 'Examples',
                },
                {
                  id: 'Tags',
                  label: 'Tags',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'all2',
      label: 'All syllabus elements',
      children: [
        {
          id: 'curriculum2',
          label: 'All curriculum elements',
          children: [
            {
              id: 'course-overview2',
              label: 'Course Overview',
            },
            {
              id: 'Rationale2',
              label: 'Rationale',
            },
            {
              id: 'Aim2',
              label: 'Aim',
            },
            {
              id: 'Outcomes2',
              label: 'Outcomes',
            },
            {
              id: 'content2',
              label: 'Content',
              children: [
                {
                  id: 'Teaching Advice2',
                  label: 'Teaching Advice',
                },
                {
                  id: 'Examples2',
                  label: 'Examples',
                },
                {
                  id: 'Tags2',
                  label: 'Tags',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  selected: [],
  defaultExpanded: 'all',
};

export const ExpandedNone = FunctionalTemplate.bind({});
ExpandedNone.args = {
  rootElements: [
    {
      id: 'all',
      label: 'All syllabus elements',
      children: [
        {
          id: 'curriculum',
          label: 'All curriculum elements',
          children: [
            {
              id: 'course-overview',
              label: 'Course Overview',
            },
            {
              id: 'Rationale',
              label: 'Rationale',
            },
            {
              id: 'Aim',
              label: 'Aim',
            },
            {
              id: 'Outcomes',
              label: 'Outcomes',
            },
            {
              id: 'content',
              label: 'Content',
              children: [
                {
                  id: 'Teaching Advice',
                  label: 'Teaching Advice',
                },
                {
                  id: 'Examples',
                  label: 'Examples',
                },
                {
                  id: 'Tags',
                  label: 'Tags',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'all2',
      label: 'All syllabus elements',
      children: [
        {
          id: 'curriculum2',
          label: 'All curriculum elements',
          children: [
            {
              id: 'course-overview2',
              label: 'Course Overview',
            },
            {
              id: 'Rationale2',
              label: 'Rationale',
            },
            {
              id: 'Aim2',
              label: 'Aim',
            },
            {
              id: 'Outcomes2',
              label: 'Outcomes',
            },
            {
              id: 'content2',
              label: 'Content',
              children: [
                {
                  id: 'Teaching Advice2',
                  label: 'Teaching Advice',
                },
                {
                  id: 'Examples2',
                  label: 'Examples',
                },
                {
                  id: 'Tags2',
                  label: 'Tags',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  selected: [],
  defaultExpanded: 'none',
};

export const ExpandedTopLevel = FunctionalTemplate.bind({});
ExpandedTopLevel.args = {
  rootElements: [
    {
      id: 'all',
      label: 'All syllabus elements',
      children: [
        {
          id: 'curriculum',
          label: 'All curriculum elements',
          children: [
            {
              id: 'course-overview',
              label: 'Course Overview',
            },
            {
              id: 'Rationale',
              label: 'Rationale',
            },
            {
              id: 'Aim',
              label: 'Aim',
            },
            {
              id: 'Outcomes',
              label: 'Outcomes',
            },
            {
              id: 'content',
              label: 'Content',
              children: [
                {
                  id: 'Teaching Advice',
                  label: 'Teaching Advice',
                },
                {
                  id: 'Examples',
                  label: 'Examples',
                },
                {
                  id: 'Tags',
                  label: 'Tags',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'all2',
      label: 'All syllabus elements',
      children: [
        {
          id: 'curriculum2',
          label: 'All curriculum elements',
          children: [
            {
              id: 'course-overview2',
              label: 'Course Overview',
            },
            {
              id: 'Rationale2',
              label: 'Rationale',
            },
            {
              id: 'Aim2',
              label: 'Aim',
            },
            {
              id: 'Outcomes2',
              label: 'Outcomes',
            },
            {
              id: 'content2',
              label: 'Content',
              children: [
                {
                  id: 'Teaching Advice2',
                  label: 'Teaching Advice',
                },
                {
                  id: 'Examples2',
                  label: 'Examples',
                },
                {
                  id: 'Tags2',
                  label: 'Tags',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  selected: [],
  defaultExpanded: 'top-level',
};

type ChildrenTakenState = 'Taken' | 'Mixed' | 'Not taken' | 'Hidden';

const makeNodes = (
  rootEnabled: boolean,
  enabledChildrenTaken: ChildrenTakenState,
  disabledChildrenTaken: ChildrenTakenState,
): [TreeElement, string[]] => {
  const id = `${rootEnabled ? 'E' : 'D'}${enabledChildrenTaken.charAt(
    0,
  )}${disabledChildrenTaken.charAt(0)}`;

  const children: TreeElement[] = [];
  const selected: string[] = [];

  switch (enabledChildrenTaken) {
    // @ts-ignore
    case 'Taken':
      selected.push(`${id}-2`);
    // @ts-ignore eslint-disable-next-line no-fallthrough
    case 'Mixed':
      selected.push(`${id}-1`);
    // @ts-ignore eslint-disable-next-line no-fallthrough
    case 'Not taken':
      children.push(
        {
          id: `${id}-1`,
          label: 'Enabled Child 1',
        },
        {
          id: `${id}-2`,
          label: 'Enabled Child 2',
        },
      );
    // @ts-ignore eslint-disable-next-line no-fallthrough
    default:
      break;
  }

  switch (disabledChildrenTaken) {
    // @ts-ignore
    case 'Taken':
      selected.push(`${id}-4`);
    // @ts-ignore eslint-disable-next-line no-fallthrough
    case 'Mixed':
      selected.push(`${id}-3`);
    // @ts-ignore eslint-disable-next-line no-fallthrough
    case 'Not taken':
      children.push(
        {
          id: `${id}-3`,
          label: 'Disabled Child 1',
          disabled: true,
        },
        {
          id: `${id}-4`,
          label: 'Disabled Child 2',
          disabled: true,
        },
      );
    // @ts-ignore eslint-disable-next-line no-fallthrough
    default:
      break;
  }

  return [
    {
      id,
      label: `${
        rootEnabled ? 'Enabled' : 'Disabled'
      } ${enabledChildrenTaken}|${disabledChildrenTaken}`,
      disabled: !rootEnabled,
      children,
    },
    selected,
  ];
};

const [children, selected] = [
  makeNodes(true, 'Taken', 'Taken'),
  makeNodes(true, 'Mixed', 'Taken'),
  makeNodes(true, 'Not taken', 'Taken'),
  makeNodes(true, 'Hidden', 'Taken'),
  makeNodes(true, 'Taken', 'Mixed'),
  makeNodes(true, 'Mixed', 'Mixed'),
  makeNodes(true, 'Not taken', 'Mixed'),
  makeNodes(true, 'Hidden', 'Mixed'),
  makeNodes(true, 'Taken', 'Not taken'),
  makeNodes(true, 'Mixed', 'Not taken'),
  makeNodes(true, 'Not taken', 'Not taken'),
  makeNodes(true, 'Hidden', 'Not taken'),
  makeNodes(true, 'Taken', 'Hidden'),
  makeNodes(true, 'Mixed', 'Hidden'),
  makeNodes(true, 'Not taken', 'Hidden'),
  makeNodes(true, 'Hidden', 'Hidden'),
].reduce<[TreeElement[], string[]]>(
  (acc, currentValue) => [
    [...acc[0], currentValue[0]],
    [...acc[1], ...currentValue[1]],
  ],
  [[], []],
);

export const TreeStatePermutations = PureTemplate.bind({});
TreeStatePermutations.args = {
  rootElements: [
    {
      id: 'all',
      label: 'All stages',
      children,
    },
  ],
  selected,
  collapsed: ['all'],
};
