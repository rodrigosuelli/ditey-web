import React from 'react';

import './styles.css';

import Meet from '../../pages/Meet';
import Team from '../../pages/Team';

export default function ShowPages(props) {

    function handleSwitchPage() {
        if (props.page === 'Team') {
            return <Team />
        }
        return <Meet />
    }

    let pagesClass = 'pages';
    if (props.page === 'Team') pagesClass += ' green';
    
    return(
        <section id="pages" className={pagesClass}>
            {handleSwitchPage()}

            <div className="button-div">
                <button onClick={() => props.onPageChange('Meet')}
                className="btn-switch"
                >
                Anterior
                </button>

                <button onClick={() => props.onPageChange('Team')}
                className="btn-switch"
                >
                Próxima
                </button>
            </div>
        </section>
    );
}