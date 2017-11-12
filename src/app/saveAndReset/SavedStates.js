import React, { Component } from 'react';

class SavedSates extends Component {
    constructor(props) {
        super(props);
        this.deleteSavedState = this.deleteSavedState.bind(this);
    }

    deleteSavedState(index) {
        const reduxLocalStates = this.props.reduxLocalStates || [];
        reduxLocalStates.splice(index, 1);
        chrome.storage.local.set({ 'reduxStates': reduxLocalStates });
        this.props.refreshLocalStorageData();
    }

    reStoreStates(savedStates) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "setState", state: savedStates },
                function (response) {
                    //success
                });
        });
    }

    render() {
        return (
            <div>
                <label className="vr-gutter">Saved Sates</label>
                <ul className="list">
                    {this.props.reduxLocalStates && this.props.reduxLocalStates.map &&
                        this.props.reduxLocalStates.map((storedState, index) => {
                            return <li key={'state_' + index}>
                                <a onClick={() => { this.reStoreStates(storedState.data) }}>{storedState.key}</a>
                                <a className="delete-link" onClick={() => { this.deleteSavedState(index) }}>X</a>
                                <span className="pull-right">{new Date(storedState.dateTime).toLocaleString()}</span>
                            </li>
                        })}

                </ul>
            </div>
        );
    }
}

export default SavedSates;
