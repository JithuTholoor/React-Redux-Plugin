import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className="container vr-gutter">
                <h3 className="app-title hr-gutter">React Store Manager</h3>
                <small>Version 0.1</small>
            </header>
        );
    }
}

export default Header;
