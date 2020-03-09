import React, { Component } from 'react';

import './styles.css';

import Sidebar from '../../components/sidebar';


export default class Main extends Component {
    render() {
        return(
            <main>
                <Sidebar />
            </main>
        );
    }
}

