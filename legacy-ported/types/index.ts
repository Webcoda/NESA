import { Syllabus } from './../../models/syllabus';
import { KeyLearningArea } from '@/models/key_learning_area';
export interface ISyllabusTab {
	id: string
	index: number
	name: string
}

export interface ILearningArea {
	id: string
	title: string
	description: string
	available: boolean // TODO remove after MVP
}

export type KlaWithSyllabuses = KeyLearningArea & { syllabuses: Syllabus[] }
