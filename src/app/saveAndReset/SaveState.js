import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from '../form/Field';

class SaveSate extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.saveCurrentStateToLocalStorage = this.saveCurrentStateToLocalStorage.bind(this);
    }

    saveCurrentStateToLocalStorage() {
        const reduxLocalStates = this.props.reduxLocalStates || [];
        reduxLocalStates.push(
            { key: this.state.keyInd, data: this.props.storeData, dateTime: Date.now() });
        chrome.storage.local.set({ 'reduxStates': reduxLocalStates });
        this.setState({ saveFormStatus: false });
        this.props.refreshLocalStorageData();
    }

    render() {
        return (
            <div>
                {
                    !this.state.saveFormStatus ?
                        <div>
                            <button className="btn" onClick={() => { this.setState({ saveFormStatus: true }) }}>
                                Save Current State
                            </button>
                        </div> :
                        <div>
                            <div className="col-6">
                                <Field placeholder="Notes" onChange={(val) => { this.setState({ keyInd: val }) }} type="text" />
                            </div>
                            <div>
                                <button className="btn" onClick={this.saveCurrentStateToLocalStorage}>
                                    Save
                                </button>
                                <button className="btn hr-gutter" onClick={() => { this.setState({ saveFormStatus: false }) }}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

SaveSate.propTypes={
    storeData:PropTypes.object,
    refreshLocalStorageData:PropTypes.func,
    reduxLocalStates:PropTypes.array
}

export default SaveSate;
