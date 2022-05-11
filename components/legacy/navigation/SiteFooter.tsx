import React from 'react';

export interface SiteFooterProps {}

const SiteFooter = (props: SiteFooterProps): JSX.Element => (
  <footer className="site-footer">
    <div className="nsw-container">
      <p className="site-footer__acknowledgement">
        NESA acknowledges Traditional Owners and Custodians of Country throughout NSW, and pays
        respect to Elders past and present. NESA recognises Aboriginal Peoples’ continuing cultures
        and connections to lands, waters, skies and community.
      </p>
      <div className="site-footer__link-list">
        <a
          href="https://www.educationstandards.nsw.edu.au/wps/portal/nesa/mini-footer/sitemap"
          className="site-footer__link"
          target="_blank"
          rel="noreferrer"
        >
          Sitemap
        </a>
        <a
          href="https://www.educationstandards.nsw.edu.au/wps/portal/nesa/mini-footer/accessibility"
          className="site-footer__link"
          target="_blank"
          rel="noreferrer"
        >
          Accessibility
        </a>
        <a
          href="https://www.educationstandards.nsw.edu.au/wps/portal/nesa/about/who-we-are/open-access-information"
          className="site-footer__link"
          target="_blank"
          rel="noreferrer"
        >
          Open Access Information
        </a>
        <a
          href="https://www.educationstandards.nsw.edu.au/wps/portal/nesa/mini-footer/disclaimer"
          className="site-footer__link"
          target="_blank"
          rel="noreferrer"
        >
          Disclaimer
        </a>
        <a
          href="https://www.educationstandards.nsw.edu.au/wps/portal/nesa/about/who-we-are/contact-nesa"
          className="site-footer__link"
          target="_blank"
          rel="noreferrer"
        >
          Contact
        </a>
        <a
          href="https://www.nsw.gov.au/"
          className="site-footer__link"
          target="_blank"
          rel="noreferrer"
        >
          NSW Government
        </a>
      </div>
      <small className="site-footer__copyright">
        <a
          href="https://educationstandards.nsw.edu.au/wps/portal/nesa/mini-footer/copyright"
          aria-label="Copyright"
          target="_blank"
          rel="noreferrer"
        >
          Copyright &copy; 2021
        </a>
      </small>
    </div>
  </footer>
);

export default SiteFooter;
