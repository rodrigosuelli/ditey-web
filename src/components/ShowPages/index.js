import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import './styles.css';

import Meet from '../../pages/Meet';
import Team from '../../pages/Team';
import App from '../../pages/App';

export default function ShowPages(props) {
  const { page, onPageChange } = props;

  function showPage() {
    switch (page) {
      case 'Team':
        return <Team />;
      case 'App':
        return <App />;
      default:
        return <Meet />;
    }
  }

  function handlePreviousPage() {
    switch (page) {
      case 'Team':
        return onPageChange('Meet');
      case 'App':
        return onPageChange('Team');
      default:
        return false;
    }
  }

  function handleNextPage() {
    switch (page) {
      case 'Meet':
        return onPageChange('Team');
      case 'Team':
        return onPageChange('App');
      default:
        return false;
    }
  }

  let pagesClass = 'pages';
  if (page === 'Team') pagesClass = 'pages green';
  if (page === 'App') pagesClass = 'pages blue';

  return (
    <section id="pages" className={pagesClass}>
      {showPage()}

      <div className="button-div">
        <AnchorLink
          offset={() => 20}
          onClick={handlePreviousPage}
          href="#pages"
        >
          <button type="button" className="btn-switch">
            Anterior
          </button>
        </AnchorLink>

        <AnchorLink offset={() => 20} onClick={handleNextPage} href="#pages">
          <button type="button" className="btn-switch">
            Próxima
          </button>
        </AnchorLink>
      </div>
    </section>
  );
}
