import React, { Component } from 'react';
import SaveSate from './SaveState';
import SavedStates from './SavedStates';

class SaveAndReset extends Component {
    render() {
        return (
            <div>
                <SaveSate {...this.props}/>
                <div className="divider"/>
                <SavedStates {...this.props}/>
            </div>
        );
    }
}

export default SaveAndReset;
