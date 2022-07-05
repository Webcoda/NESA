// import { KeyLearningArea } from '@/models/key_learning_area';
import { Syllabus } from './../../models/syllabus'
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

// export type KlaWithSyllabuses = KeyLearningArea & { syllabuses: Syllabus[] }
