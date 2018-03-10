import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <header className="container vr-gutter">
                <h3 className="app-title hr-gutter">React Store Manager</h3>
                <small>Version 0.1</small>
            </header>
        );
    }
}

Header.propTypes={        
}

export default Header;
