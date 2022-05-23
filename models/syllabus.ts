import { IContentItem, Elements } from '@kentico/kontent-delivery';

/**
 * Generated by '@kentico/kontent-model-generator@4.1.0'
 */
export type Syllabus = IContentItem<{
  courseoverview_organisationofcontent: Elements.RichTextElement;
  courseoverview_coursenumbers: Elements.LinkedItemsElement<IContentItem>;
  available: Elements.MultipleChoiceElement;
  courseoverview_learning1_10: Elements.RichTextElement;
  key_learning_area: Elements.LinkedItemsElement<IContentItem>;
  courseoverview_introduction: Elements.RichTextElement;
  from_date: Elements.DateTimeElement;
  courseoverview_achievementhsc: Elements.LinkedItemsElement<IContentItem>;
  courseoverview_prerequisits: Elements.LinkedItemsElement<IContentItem>;
  assessments: Elements.LinkedItemsElement<IContentItem>;
  courseoverview_learning11: Elements.RichTextElement;
  courseoverview_syllabustype: Elements.MultipleChoiceElement;
  related_life_skills_syllabus: Elements.LinkedItemsElement<IContentItem>;
  courseoverview_learning12: Elements.RichTextElement;
  courseoverview_selftuition: Elements.MultipleChoiceElement;
  aim: Elements.CustomElement;
  courseoverview_200hourrules: Elements.RichTextElement;
  overview: Elements.CustomElement;
  outcomes: Elements.LinkedItemsElement<IContentItem>;
  code: Elements.TextElement;
  courseoverview_endorsementtype: Elements.MultipleChoiceElement;
  courseoverview_exclusions: Elements.LinkedItemsElement<IContentItem>;
  courseoverview_achievementstage4_5: Elements.LinkedItemsElement<IContentItem>;
  courseoverview_enrolmenttype: Elements.MultipleChoiceElement;
  to_date: Elements.DateTimeElement;
  title: Elements.TextElement;
  stagesyears__years: Elements.MultipleChoiceElement;
  courseoverview_eligibility: Elements.RichTextElement;
  courseoverview_corequisites: Elements.LinkedItemsElement<IContentItem>;
  courseoverview_100hourrules: Elements.RichTextElement;
  rationale: Elements.CustomElement;
  courseoverview_courcerequirements: Elements.RichTextElement;
  courseoverview_otherinfo: Elements.RichTextElement;
  focus_areas: Elements.LinkedItemsElement<IContentItem>;
  stagesyears__stages: Elements.LinkedItemsElement<IContentItem>;
}>;
