import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

SaveAndReset.propTypes={
    storeData:PropTypes.object,
    refreshLocalStorageData:PropTypes.func,
    reduxLocalStates:PropTypes.array
}

export default SaveAndReset;
