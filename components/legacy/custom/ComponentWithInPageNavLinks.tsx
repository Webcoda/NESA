import React from 'react';
import { Grid } from '@material-ui/core';
import CustomInPageNavLinks, { PageSection } from '../base/CustomInPageNavLinks';
import { stripHtml, uriConvert } from '../../utilities/functions';
import SanitisedHTMLContainer from '../base/SanitisedHTMLContainer';

export interface ComponentWithInPageNavLinksProps {
  /**
   * Title of component
   */
  title: string;

  /**
   * List of contents
   */
  contents: PageSection[];

  /**
   * Summary
   */
  summary?: string;
}

const ComponentWithInPageNavLinks = (props: ComponentWithInPageNavLinksProps): JSX.Element => {
  const { title, contents, summary } = props;

  const handleLinkClick = (link: PageSection) => {
    const element = document.getElementById(uriConvert(link.title));
    element?.scrollIntoView();
  };

  return (
    <Grid container className="component-with-page-nav-links" direction="column">
      <Grid container item className="component-with-page-nav-links__buttons">
        <CustomInPageNavLinks title={title} links={contents} onLinkClick={handleLinkClick} />
      </Grid>
      {summary && (
        <div className="component-with-page-nav-links__content-body">
          <SanitisedHTMLContainer className="cms-content-formatting">
            {summary}
          </SanitisedHTMLContainer>
        </div>
      )}
      <Grid container item className="component-with-page-nav-links__content-wrapper">
        {contents.map((item, index) => (
          <div key={item.title} className="component-with-page-nav-links__content">
            <Grid id={uriConvert(item.title)} container>
              <Grid container className="component-with-page-nav-links__content-title">
                <h2>{stripHtml(item.title)}</h2>
              </Grid>
              <Grid container className="component-with-page-nav-links__content-body">
                <SanitisedHTMLContainer className="cms-content-formatting">
                  {item.content}
                </SanitisedHTMLContainer>
              </Grid>
            </Grid>
            {index < contents.length - 1 && (
              <Grid container item xs={12}>
                <hr />
              </Grid>
            )}
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default ComponentWithInPageNavLinks;
