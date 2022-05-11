import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import SyllabusContentSection from './SyllabusContentSection';

const meta: ComponentMeta<typeof SyllabusContentSection> = {
  title: 'Components/Syllabus/SyllabusContentSection',
  component: SyllabusContentSection,
};
export default meta;

const Template: ComponentStory<typeof SyllabusContentSection> = (props) => (
  <>
    <SyllabusContentSection {...props} />
    <SyllabusContentSection {...props} />
    <SyllabusContentSection {...props} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  innerHtml: '<span>Content</span>',
};

export const UnsafeInput = Template.bind({});
UnsafeInput.args = {
  innerHtml: '<img src=x onerror=alert(1)//>',
};

export const Latex = Template.bind({});
Latex.args = {
  innerHtml:
    '<p>FOR TESTING ONLY</p><p>This formula is not key: <span class="ql-formula" data-value="e=2\\\\pi^2"><span contenteditable="false"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>e</mi><mo>=</mo><mn>2</mn><msup><mi>π</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">e=2\\\\pi^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.43056em; vertical-align: 0em;"></span><span class="mord mathnormal">e</span><span class="mspace" style="margin-right: 0.277778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right: 0.277778em;"></span></span><span class="base"><span class="strut" style="height: 0.814108em; vertical-align: 0em;"></span><span class="mord">2</span><span class="mord"><span class="mord mathnormal" style="margin-right: 0.03588em;">π</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height: 0.814108em;"><span class="" style="top: -3.063em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></span></span>  </p><p>This is: <span class="ql-formula" data-value="e=mc^2"><span contenteditable="false"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>e</mi><mo>=</mo><mi>m</mi><msup><mi>c</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">e=mc^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.43056em; vertical-align: 0em;"></span><span class="mord mathnormal">e</span><span class="mspace" style="margin-right: 0.277778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right: 0.277778em;"></span></span><span class="base"><span class="strut" style="height: 0.814108em; vertical-align: 0em;"></span><span class="mord mathnormal">m</span><span class="mord"><span class="mord mathnormal">c</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height: 0.814108em;"><span class="" style="top: -3.063em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></span></span></p>',
};
