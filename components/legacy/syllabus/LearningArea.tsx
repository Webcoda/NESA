import React, { useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import { parse, ParsedQs } from 'qs';
import Content from './Content';
import Glossary from '../base/Glossary';
import DownloadList from './DownloadList';
import Outcomes from './Outcomes';
import CoursePerformance from './CoursePerformance';
import SyllabusContentSection from './SyllabusContentSection';
import pathConstants, { Sections } from '../../constants/pathConstants';
import LearningAreaHeader from './LearningAreaHeader';
import VersionHistoryLogModal from './VersionHistoryLogModal';
import EditViewModal, { ViewSelection } from './EditViewModal';
import { TreeElement } from '../custom/treeUtils';
import TabBar from '../tabs/TabBar';
import { SyllabusTabPanel } from '../tabs/TabPanel';
import SYLLABUS from '../../constants/syllabusConstants';
import { customSyllabusQueryString, yearRangeText } from '../../utilities/functions';
import useTabNavigation from '../../utilities/hooks/useTabNavigation';
import { AllStages, findStage, Stages } from '../../store/mock/stages';
import useSyllabusList from '../../utilities/hooks/useSyllabusList';
import useFullSyllabuses from '../../utilities/hooks/useFullSyllabuses';
import DownloadViewOverlay from '../document/DownloadViewOverlay';
import { AllTags } from '../../store/mock/tags';

export interface IVersionHistoryLog {
  id: number;
  name: string;
  hasMoreInfo?: boolean;
}

export interface ISyllabusTab {
  id: string;
  index: number;
  name: string;
}

export interface IChangeLogData {
  type: string;
  typeDescription: string;
  data: string;
}

export interface IChangeLogStage {
  id: number;
  name: string;
  before: IChangeLogData;
  after: IChangeLogData;
}

export interface IChangeLog {
  date: Date;
  descriptionHTML: string;
  stages: IChangeLogStage[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

// version history
export const versionHistoryLog: TreeElement[] = [
  {
    id: 'future-syllabus-2023',
    label: 'Future Syllabus: 2023',
    moreInfo: 'Details about when to start teaching future courses etc',
  },
  {
    id: 'current-syllabus-2021',
    label: 'Current Syllabus: 2021',
  },
  {
    id: 'previous-Syllabus-2006',
    label: 'Previous Syllabus: 2006',
  },
];

export const syllabusTabs: ISyllabusTab[] = [
  {
    id: 'course-overview',
    index: 0,
    name: 'Course overview',
  },
  {
    id: 'rationale',
    index: 1,
    name: 'Rationale',
  },
  {
    id: 'aim',
    index: 2,
    name: 'Aim',
  },
  {
    id: 'outcomes',
    index: 3,
    name: 'Outcomes',
  },
  {
    id: 'content',
    index: 4,
    name: 'Content',
  },
  {
    id: 'assessment',
    index: 5,
    name: 'Assessment',
  },
  {
    id: 'glossary',
    index: 6,
    name: 'Glossary',
  },
  {
    id: 'teaching-and-learning',
    index: 7,
    name: 'Teaching and learning support',
  },
];

// Change log dummy data
export const changeLogData = {
  date: new Date('14 October 2019'),
  descriptionHTML:
    '\n<p>The following amendments have been made to the English K–10 Syllabus (2012): </p>\n\n' +
    '<h5>All Stages</h5>\n\n' +
    ' <ul>\n' +
    '   <li>\n' +
    '     The phrase "Students will develop" has been amended to "Student develop\n' +
    '   </li>\n' +
    '   <li>\n' +
    '     Added additional text to Aboriginal and Torres Strait Islander histories and cultures in Learning across the curriculum\n' +
    '   </li>\n' +
    '   <li>\n' +
    '     Updated "Students with special education needs" to "Students with disability\n' +
    '   </li>\n' +
    '   <li>\n' +
    '     Mapping advice demonstrating the range and level of literacy skills students need to successfully access the outcomes and content has been incorporated into the syllabus\n' +
    '   </li>\n' +
    ' </ul>\n' +
    '</p>',
  stages: [
    {
      id: 1,
      name: 'Stage 2',
      before: {
        type: 'Objective A',
        typeDescription: 'Spelling',
        data: 'Spelling (SpG-SpG11)',
      },
      after: {
        type: 'Objective A',
        typeDescription: 'Spelling',
        data: 'Spelling (SpG7-SpG9)',
      },
    },
    {
      id: 1,
      name: 'Stage 3',
      before: {
        type: 'Objective A',
        typeDescription: 'Spelling',
        data: 'Spelling (SpG-SpG11)',
      },
      after: {
        type: 'Objective A',
        typeDescription: 'Spelling',
        data: 'Spelling (SpG7-SpG9)',
      },
    },
  ],
};

export interface LearningAreaProps {
  area: string;
  syllabusId: string;
  showDownloadOverlay: boolean;
  onDownloadOverlayConfirm: () => void;
}

function LearningArea(props: LearningAreaProps) {
  const { area, syllabusId, showDownloadOverlay, onDownloadOverlayConfirm } = props;
  const location = useLocation();
  const query = parse(location.search, { ignoreQueryPrefix: true });

  const initialStage = query.stage as string | undefined;
  const initialTab = query.tab as string | undefined;
  const options = query.options as ParsedQs | undefined;

  const allSyllabuses = useSyllabusList();

  const items = useMemo(
    () => [
      {
        id: syllabusId,
        requireGlossary: true,
        requireOutcomes: true,
        requireFiles: true,
        requireContents: true,
      },
    ],
    [syllabusId],
  );
  const [[syllabus], loading] = useFullSyllabuses(items);

  const classes = useStyles();

  // Syllabus Tags
  const [tabValue, setTabValue] = useState(initialTab ?? syllabusTabs[0].id);
  const [currentTabs, setCurrentTabs] = useState(syllabusTabs);

  // version history
  const [displayVersionHistoryLogModal, setDisplayVersionHistoryLogModal] = useState(false);

  // Edit view
  const [displayEditViewModal, setDisplayEditViewModal] = useState(false);
  const [stage, setStage] = useState<string>(initialStage ?? Stages.earlyStage1.id);

  // This useState was causing the issue: DC148
  // const [learningArea, setLearningArea] = useState(area);

  const history = useHistory();

  const handleTabChange = (newTabValue: string) => {
    setTabValue(newTabValue);
  };

  const handleEditViewModalConfirm = (selectedItems: ViewSelection) => {
    const selectedTabs = syllabusTabs.filter((tab) => selectedItems.tabs.includes(tab.id));
    setCurrentTabs(selectedTabs);

    setDisplayEditViewModal(false);

    // If current tab is now hidden, select first visible tab
    if (!selectedTabs.some((t) => t.id === tabValue)) {
      setTabValue(selectedTabs[0].id);
    }
  };

  const handleVersionSelect = (keys: string[]) => {
    // console.log('handleVersionSelect keys: ', keys);
    setDisplayVersionHistoryLogModal(false);
  };

  const handleLearningAreaHeaderConfirm = (ids: string[]) => {
    const syllabuses = allSyllabuses.filter(
      (syl) => ids.includes(syl.kla_id) && syl.stageIds.some((id) => id === stage),
    );
    /*
      update the subject title when confirming,
      we just want to update in case there's only one syllabus selected
    */
    // If more than 1 Learning Area is selected redirect to Custom Syllabus page
    if (ids.length > 1) {
      history.push({
        pathname: Sections.CUSTOM_SYLLABUS.url,
        search: customSyllabusQueryString({
          stageIds: [stage as string],
          tabIds: currentTabs.map((t) => t.id),
          syllabusIds: syllabuses.map((s) => s.id),
        }),
      });
    } else if (syllabuses && syllabuses.length === 1) {
      // exactly 1 syllabus, redirect to it's page
      history.push({
        pathname: `${pathConstants.LEARNING_AREAS}/${ids[0]}/${syllabuses[0].id}`,
      });
    } else {
      // Not sure what we do here
      // setLearningArea(ids[0] as string);
    }
  };

  const onStagesHeaderConfirm = (ids: string[]) => {
    // If more than 1 Stage is selected redirect to Custom Syllabus page
    if (ids.length > 1) {
      history.push({
        pathname: Sections.CUSTOM_SYLLABUS.url,
        search: customSyllabusQueryString({
          stageIds: ids as string[],
          tabIds: currentTabs.map((t) => t.id),
          syllabusIds: [syllabusId],
        }),
      });
    } else {
      setStage(ids[0]);
    }
  };

  const handleTabPrevious = () => {
    const newTab = useTabNavigation(currentTabs, tabValue, 'PREVIOUS');
    if (newTab) {
      setTabValue(newTab?.id);
    }
  };

  const handleTabNext = () => {
    const newTab = useTabNavigation(currentTabs, tabValue, 'NEXT');
    if (newTab) {
      setTabValue(newTab?.id);
    }
  };

  if (loading) {
    return <span>loading</span>;
  }

  if (!syllabus) {
    return <span>error</span>;
  }
  return (
    <div className="syllabus-overview-page">
      <div className="syllabus-overview-page__container">
        <LearningAreaHeader
          subjectTag={yearRangeText(syllabus.stageIds.map(findStage))}
          subjectTitle={syllabus.syllabusName}
          stageName={AllStages.find((s) => s.id === stage)?.label ?? 'Unknown'}
          onVersionHistoryClick={() => setDisplayVersionHistoryLogModal(true)}
          onEditViewClick={() => {
            setDisplayEditViewModal(true);
          }}
          selectedAreas={[area]}
          selectedStages={[stage]}
          area={area}
          onLearningAreaHeaderConfirm={handleLearningAreaHeaderConfirm}
          onStagesHeaderConfirm={onStagesHeaderConfirm}
        />
        {/* tabs */}
        <div className="syllabus-header__tabs">
          <div className={`${classes.root}`}>
            <TabBar
              value={tabValue}
              onChange={handleTabChange}
              tabs={currentTabs.map((tab) => ({
                tabId: tab.id,
                label: tab.name,
                panelId: `tab-panel-${tab.id}`,
                className: `${
                  tab.id === tabValue ? 'syllabus-header__tab--selected' : 'syllabus-header__tab'
                }`,
              }))}
              className="syllabus-header__custom-tabs"
              onPreviousClick={handleTabPrevious}
              onNextClick={handleTabNext}
            />
            {/* course-overview */}
            <SyllabusTabPanel id={syllabusTabs[0].id} tabValue={tabValue}>
              <SyllabusContentSection innerHtml={syllabus.course_overview} />
            </SyllabusTabPanel>
            {/* rationale */}
            <SyllabusTabPanel id={syllabusTabs[1].id} tabValue={tabValue}>
              <SyllabusContentSection innerHtml={syllabus.rationale} />
            </SyllabusTabPanel>
            {/* aim */}
            <SyllabusTabPanel id={syllabusTabs[2].id} tabValue={tabValue}>
              <SyllabusContentSection innerHtml={syllabus.aim} />
            </SyllabusTabPanel>
            {/* outcomes */}
            <SyllabusTabPanel id={syllabusTabs[3].id} tabValue={tabValue}>
              <Outcomes outcomes={syllabus.outcomes} />
            </SyllabusTabPanel>
            {/* content-organisers */}
            <SyllabusTabPanel id={syllabusTabs[4].id} tabValue={tabValue}>
              <Content
                defaultOffsetTop={SYLLABUS.CONTENT_DEFAULT_OFFSET_TOP.LEARNING_AREA}
                stageId={stage}
                supportElementId={syllabusTabs[4].id}
                content={syllabus.contents?.filter((c) => c.stageIds.includes(stage ?? ''))}
                files={syllabus.files?.filter((c) => c.stageIds.includes(stage ?? '')) ?? []}
                initialState={{
                  teachingSupport: options?.teachingSupport === 'true',
                  contentOrganiser: options?.contentOrganiser as string | undefined,
                }}
              />
            </SyllabusTabPanel>
            {/* assessment */}
            <SyllabusTabPanel id={syllabusTabs[5].id} tabValue={tabValue}>
              <CoursePerformance sections={syllabus.grades} />
            </SyllabusTabPanel>
            {/* glossary */}
            <SyllabusTabPanel id={syllabusTabs[6].id} tabValue={tabValue}>
              <Glossary sections={syllabus.glossaryTerms ?? []} />
            </SyllabusTabPanel>
            {/* teaching-and-learning */}
            <SyllabusTabPanel id={syllabusTabs[7].id} tabValue={tabValue}>
              <DownloadList
                files={syllabus.files?.filter((c) => c.stageIds.includes(stage ?? '')) ?? []}
                colour="secondary"
              />
            </SyllabusTabPanel>
          </div>
        </div>
      </div>
      {displayVersionHistoryLogModal && (
        <VersionHistoryLogModal
          title="Version History"
          modalStatus={displayVersionHistoryLogModal}
          onConfirm={handleVersionSelect}
          onCancel={() => setDisplayVersionHistoryLogModal(false)}
          versionHistoryLog={versionHistoryLog}
          changeLog={changeLogData}
        />
      )}
      {displayEditViewModal && (
        <EditViewModal
          title="What tabs would you like to view?"
          modalStatus={displayEditViewModal}
          onConfirm={handleEditViewModalConfirm}
          onCancel={() => setDisplayEditViewModal(false)}
          selectedTabs={currentTabs.map((tab) => tab.id)}
        />
      )}
      <DownloadViewOverlay
        modalStatus={showDownloadOverlay}
        handleConfirm={onDownloadOverlayConfirm}
        syllabuses={[syllabus]}
        options={{
          courseOverview: currentTabs.some((tab) => tab.id === 'course-overview'),
          rationale: currentTabs.some((tab) => tab.id === 'rationale'),
          aim: currentTabs.some((tab) => tab.id === 'aim'),
          outcomes: currentTabs.some((tab) => tab.id === 'outcomes'),
          content: currentTabs.some((tab) => tab.id === 'content'),
          accessPoints: currentTabs.some((tab) => tab.id === 'content'), // Always show access points
          examples: currentTabs.some((tab) => tab.id === 'content'), // Always show examples
          assessment: currentTabs.some((tab) => tab.id === 'assessment'),
          glossary: currentTabs.some((tab) => tab.id === 'glossary'),
          support: currentTabs.some((tab) => tab.id === 'teaching-and-learning'),
        }}
        stageIds={[stage]}
        tagIds={AllTags.map((t) => t.code)}
      />
    </div>
  );
}

export default LearningArea;
