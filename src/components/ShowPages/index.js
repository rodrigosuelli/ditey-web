import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import './styles.css';

import Meet from '../../pages/Meet';
import Team from '../../pages/Team';
import App from '../../pages/App';

export default function ShowPages(props) {

    function showPage() {
        if (props.page === 'Team') {
            return <Team />
        }

        if (props.page === 'App') {
            return <App />
        }
        
        return <Meet />
    }

    function handlePreviousPage() {
        if (props.page === 'Team') {
            return props.onPageChange('Meet');
        }

        if (props.page === 'App') {
            return props.onPageChange('Team');
        }

        return;
    }

    function handleNextPage() {
        if (props.page === 'Meet') {
            return props.onPageChange('Team');
        }

        if (props.page === 'Team') {
            return props.onPageChange('App');
        }

        return;
    }

    let pagesClass = 'pages';
    if (props.page === 'Team') pagesClass = 'pages green';
    if (props.page === 'App') pagesClass = 'pages blue';
    
    return(
        <section id="pages" className={pagesClass}>
            {showPage()}

            <div className="button-div">
                <AnchorLink 
                offset={() => 40}
                onClick={handlePreviousPage}
                href='#pages'
                >
                <button className="btn-switch">Anterior</button>
                </AnchorLink>

                <AnchorLink 
                offset={() => 40}
                onClick={handleNextPage}
                href='#pages'
                >
                <button className="btn-switch">Próxima</button>
                </AnchorLink>
            </div>
        </section>
    );
}