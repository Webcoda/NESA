import { AlignmentType, HeadingLevel } from 'docx';

export const ParseNodeTypes = {
  structure: 'structure',
  textRun: 'textRun',
  image: 'image',
} as const;

interface ParseNodeBase {
  type: string;
  closed: boolean;
}

export interface StructureParseNodeAttributes {
  headingLevel?: HeadingLevel;
  paragraph?: boolean;
  list?: boolean;
  bold?: boolean;
  italic?: boolean;
  backgroundColour?: string;
  style?: string;
  textAlign?: AlignmentType;
  indent?: number;
}

export interface StructureParseNode extends ParseNodeBase {
  type: typeof ParseNodeTypes.structure;
  children: ParseNode[];
  attributes: StructureParseNodeAttributes;
}

export interface TextRunParseNode extends ParseNodeBase {
  type: typeof ParseNodeTypes.textRun;
  content: string;
}

export interface ImageParseNode extends ParseNodeBase {
  type: typeof ParseNodeTypes.image;
  src: string;
  data?: {
    file: ArrayBuffer;
    width: number;
    height: number;
  };
}

export type ParseNode = StructureParseNode | TextRunParseNode | ImageParseNode;

export const isStructureNode = (node: ParseNode): node is StructureParseNode =>
  node?.type === ParseNodeTypes.structure;
export const isTextNode = (node: ParseNode): node is TextRunParseNode =>
  node?.type === ParseNodeTypes.textRun;
export const isImageNode = (node: ParseNode): node is ImageParseNode =>
  node?.type === ParseNodeTypes.image;

export const createContainerNode = (
  attributes: StructureParseNodeAttributes = {},
): StructureParseNode => ({
  type: ParseNodeTypes.structure,
  children: [],
  attributes,
  closed: false,
});
export const createTextRunNode = (content: string = ''): TextRunParseNode => ({
  type: ParseNodeTypes.textRun,
  content,
  closed: false,
});
export const createImageNode = (src: string = ''): ImageParseNode => ({
  type: ParseNodeTypes.image,
  src,
  closed: false,
});
