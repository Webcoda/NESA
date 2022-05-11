import { getLeaves, getNodes, patchTree, TreeElement } from './treeUtils';

const makeNode = (props: Partial<TreeElement>): TreeElement => ({
  id: 'testNode',
  label: 'Test Node',
  children: undefined,
  ...props,
});

describe('Tree Utility functions', () => {
  describe('patchTree', () => {
    const root = makeNode({
      id: 'root',
      label: 'Root',
      children: [
        makeNode({
          id: 'hasChildren',
          label: 'Has Children',
          children: [
            makeNode({ id: 'leaf1', label: 'Leaf 1' }),
            makeNode({ id: 'leaf2', label: 'Leaf 2' }),
          ],
        }),
        makeNode({ id: 'noChildren', label: 'No Children' }),
      ],
    });

    test('Identifies Root', () => {
      const { tree, updated } = patchTree(root, 'root', (n) => ({ ...n, label: 'Updated' }));
      expect(tree.label).toBe('Updated');
      expect(updated).toBe(true);
    });

    test('Identifies 1 level deep', () => {
      const { tree, updated } = patchTree(root, 'noChildren', (n) => ({ ...n, label: 'Updated' }));
      expect(tree.children![1].label).toBe('Updated');
      expect(updated).toBe(true);
    });

    test('Identifies Multiple levels deep', () => {
      const { tree, updated } = patchTree(root, 'leaf2', (n) => ({ ...n, label: 'Updated' }));
      expect(tree.children![0].children![1].label).toBe('Updated');
      expect(updated).toBe(true);
    });

    test("Doesn't affect original", () => {
      const { tree, updated } = patchTree(root, 'root', (n) => ({ ...n, label: 'Updated' }));
      expect(root.label).toBe('Root');
    });
  });

  describe('getNodes', () => {
    const root = makeNode({
      id: 'root',
      label: 'Root',
      children: [
        makeNode({
          id: 'hasChildren',
          label: 'Has Children',
          children: [
            makeNode({ id: 'leaf1', label: 'Leaf 1' }),
            makeNode({ id: 'leaf2', label: 'Leaf 2' }),
          ],
        }),
        makeNode({ id: 'noChildren', label: 'No Children' }),
      ],
    });

    test('Nodes with children', () => {
      const result = getNodes([root], (n) => !!n.children?.length);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(root);
      expect(result[1]).toEqual(root.children![0]);
    });

    test('getLeaves', () => {
      const result = getLeaves([root]);

      expect(result).toHaveLength(3);
      expect(result).toMatchObject(
        expect.arrayContaining([
          { id: 'leaf1', label: 'Leaf 1' },
          { id: 'leaf2', label: 'Leaf 2' },
          { id: 'noChildren', label: 'No Children' },
        ]),
      );
    });

    test('handles empty', () => {
      const result = getLeaves([]);

      expect(result).toHaveLength(0);
    });
  });
});
