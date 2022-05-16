import { KlaWithSyllabuses } from "@/legacy-ported/types";
import { ILearningArea } from "@/legacy-ported/utilities/backendTypes";
import { ReactNode } from "react";
import CustomAccordion from "../custom/CustomAccordion";
import { SyllabusTabPanelProps, SyllabusTabPanel } from "../tabs/TabPanel";
export interface StageTabPanelProps {
	id: SyllabusTabPanelProps['id']
	tabValue: SyllabusTabPanelProps['tabValue']
	learningAreas: KlaWithSyllabuses[],
	body: (kla: any) => ReactNode
}
export const StageTabPanel = (props: StageTabPanelProps) => {
	const { id, tabValue, learningAreas, body } = props
	return (
		<SyllabusTabPanel id={id} tabValue={tabValue}>
			{/* Show available syllabuses first */}
			{learningAreas.map((kla) => (
				<div id={kla.system.id} key={kla.system.id}>
					{kla.syllabuses
						// .filter((syl) => syl.available)
						.map((syl) => (
						<CustomAccordion
								id={syl.system.id}
								key={syl.system.id}
								title={syl.elements.title.value}
								// TODO: Remove isComingSoon condition after MVP
								startOpen={true}
								isComingSoon={!true}
							>
								{body(syl)}
							</CustomAccordion>
						))}
				</div>
			))}
			{/* Show unavailable syllabuses at the end */}
			{learningAreas.map((kla) => (
				<div id={`${kla.system.id}|unavailable`} key={kla.system.id}>
					{kla.syllabuses
						// .filter((syl) => !syl.available)
						.map((syl) => (
							// <CustomAccordion
							// 	id={syl.id}
							// 	key={syl.code}
							// 	title={syl.syllabusName}
							// 	// TODO: Remove isComingSoon condition after MVP
							// 	startOpen={syl.available}
							// 	isComingSoon={!syl.available}
							// >
							// 	{body(syl)}
							// </CustomAccordion>
							null
						))}
				</div>
			))}
		</SyllabusTabPanel>
	)
}
