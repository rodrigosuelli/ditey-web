import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import './styles.css';

import Meet from '../../pages/Meet';
import Team from '../../pages/Team';
import App from '../../pages/App';

export default function ShowPages(props) {
  const { page, onPageChange } = props;

  function showPage() {
    if (page === 'Team') {
      return <Team />;
    }

    if (page === 'App') {
      return <App />;
    }

    return <Meet />;
  }

  function handlePreviousPage() {
    if (page === 'Team') {
      return onPageChange('Meet');
    }

    if (page === 'App') {
      return onPageChange('Team');
    }
    return false;
  }

  function handleNextPage() {
    if (page === 'Meet') {
      return onPageChange('Team');
    }

    if (page === 'Team') {
      return onPageChange('App');
    }
    return false;
  }

  let pagesClass = 'pages';
  if (page === 'Team') pagesClass = 'pages green';
  if (page === 'App') pagesClass = 'pages blue';

  return (
    <section id="pages" className={pagesClass}>
      {showPage()}

      <div className="button-div">
        <AnchorLink offset={() => 40} onClick={handlePreviousPage} href="#pages">
          <button type="button" className="btn-switch">
            Anterior
          </button>
        </AnchorLink>

        <AnchorLink offset={() => 40} onClick={handleNextPage} href="#pages">
          <button type="button" className="btn-switch">
            Próxima
          </button>
        </AnchorLink>
      </div>
    </section>
  );
}
