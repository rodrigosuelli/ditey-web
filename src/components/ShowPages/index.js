import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import './styles.css';

import Meet from './components/Meet';
import Team from './components/Team';
import App from './components/App';

export default function ShowPages(props) {
  const { page, onPageChange } = props;

  function handlePreviousPage() {
    switch (page) {
      case 'Team':
        onPageChange('Meet');
        break;
      case 'App':
        onPageChange('Team');
        break;
      default:
    }
  }

  function handleNextPage() {
    switch (page) {
      case 'Meet':
        onPageChange('Team');
        break;
      case 'Team':
        onPageChange('App');
        break;
      default:
    }
  }

  let pagesClass = 'pages';
  switch (page) {
    case 'Team':
      pagesClass += ' green';
      break;
    case 'App':
      pagesClass += ' purple';
      break;
    default:
  }

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
