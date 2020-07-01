import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import './styles.css';

import Meet from '../../pages/Meet';
import Team from '../../pages/Team';
import App from '../../pages/App';

export default function ShowPages(props) {
  const { page, onPageChange } = props;

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
  if (page === 'Team') pagesClass += ' green';
  if (page === 'App') pagesClass += ' purple';

  return (
    <section id="pages" className={pagesClass}>
      <Meet active={page === 'Meet'} />
      <Team active={page === 'Team'} />
      <App active={page === 'App'} />

      <div className="button-div">
        <AnchorLink
          offset={() => -44}
          onClick={handlePreviousPage}
          className="btn-switch"
          href="#pages"
        >
          Anterior
        </AnchorLink>

        <AnchorLink
          offset={() => -44}
          onClick={handleNextPage}
          className="btn-switch"
          href="#pages"
        >
          Próxima
        </AnchorLink>
      </div>
    </section>
  );
}
