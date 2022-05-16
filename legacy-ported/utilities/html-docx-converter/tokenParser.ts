import { StartTag, Token } from 'simple-html-tokenizer';
import { AlignmentType, HeadingLevel } from 'docx';
import {
  createContainerNode,
  createImageNode,
  createTextRunNode,
  isStructureNode,
  ParseNode,
  ParseNodeTypes,
  StructureParseNodeAttributes,
} from './parserNodes';

const structureHeadingLevel: Record<string, HeadingLevel> = {
  h1: HeadingLevel.HEADING_1,
  h2: HeadingLevel.HEADING_2,
  h3: HeadingLevel.HEADING_3,
  h4: HeadingLevel.HEADING_4,
  h5: HeadingLevel.HEADING_5,
} as const;

const paragraphNodes = ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'li'];
const listNodes = ['ol', 'ul'];
const boldNodes = ['b', 'strong'];
const italicNodes = ['i', 'em'];

const getClassAttributes = (className: string): StructureParseNodeAttributes => {
  switch (className) {
    case 'ql-align-center':
      return {
        textAlign: AlignmentType.CENTER,
      };
    case 'ql-indent-1':
      return {
        indent: 1,
      };
    case 'ql-indent-2':
      return {
        indent: 2,
      };
    case 'ql-indent-3':
      return {
        indent: 3,
      };
    case 'ql-indent-4':
      return {
        indent: 4,
      };
    default:
      return {};
  }
};

const parseAttributes = (token: StartTag): StructureParseNodeAttributes => {
  const { tagName, attributes } = token;

  const classNames = attributes.find((attr) => attr[0] === 'class')?.[1].split(' ') ?? [];
  const classAttributes = classNames.reduce<StructureParseNodeAttributes>(
    (acc, val) => ({ ...acc, ...getClassAttributes(val) }),
    {},
  );

  return {
    headingLevel: structureHeadingLevel[tagName],
    paragraph: paragraphNodes.includes(tagName),
    list: listNodes.includes(tagName),
    bold: boldNodes.includes(tagName),
    italic: italicNodes.includes(tagName),
    ...classAttributes,
  };
};

const createNode = (token: StartTag): ParseNode | null => {
  switch (token.tagName) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'li':
    case 'p':
    case 'div':
    case 'span':
    case 'strong':
    case 'b':
    case 'i':
    case 'em':
    case 'ul':
    case 'ol':
      return createContainerNode(parseAttributes(token));
    case 'img':
      // console.log(token);
      return createImageNode(token.attributes.find((attr) => attr[0] === 'src')?.[1]);
    default:
      console.error(`Skipping node with tagName ${token.tagName}`);
      return null;
  }
};

export const pruneNode = (node: ParseNode): ParseNode[] => {
  switch (node.type) {
    case ParseNodeTypes.textRun:
      // trim empty nodes
      if (node.content.trim().length > 0) {
        return [node];
      }
      break;
    case ParseNodeTypes.image:
      // trim images with no source
      if (node.src.length > 0) {
        return [node];
      }
      break;
    case ParseNodeTypes.structure:
    default:
      node.children = node.children.flatMap(pruneNode);
      // trim nodes with no text children
      if (node.children.length) {
        return [node]; // TODO prune structure nodes
      }
  }

  return [];
};

export default function tokenParser(
  tokenStream: IterableIterator<Token>,
  parentTag?: string,
): ParseNode[] {
  const nodes: ParseNode[] = [];

  let result = tokenStream.next();
  while (!result.done) {
    const token = result.value;
    switch (token.type) {
      case 'StartTag':
        // eslint-disable-next-line no-case-declarations
        const newNode = createNode(token);
        if (newNode) {
          nodes.push(newNode);

          if (token.selfClosing) {
            newNode.closed = true;
          } else if (isStructureNode(newNode)) {
            // console.log('Opening child context:', token.tagName);
            newNode.children = tokenParser(tokenStream, token.tagName);
            newNode.closed = true;
          }
        }
        break;
      case 'EndTag':
        if (token.tagName === parentTag) {
          // Closing out of a child context
          // console.log('Closing child context:', parentTag);
          return nodes;
        }
        console.error(`Unexpected closing token: expected ${parentTag} received`, token);
        break;
      case 'Chars':
        nodes.push(createTextRunNode(token.chars));
        break;
      default:
        console.error('Unexpected token type', token);
    }
    result = tokenStream.next();
  }
  return nodes;
}
