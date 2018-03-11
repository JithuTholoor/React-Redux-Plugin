import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DispatchActionForm from '../form/JSONForm';

class SavedSates extends Component {


    constructor(props) {
        super(props);
        this.deleteSavedState = this.deleteSavedState.bind(this);
        this.setDispatchAction = this.setDispatchAction.bind(this);
        this.state = { dispatchAction: "" }
    }

    componentDidMount() {
        chrome.storage.local.get('dispatchAction', (data) => {
            data && this.setState({ dispatchAction: data.dispatchAction });
        })
    }

    deleteSavedState(index) {
        const reduxLocalStates = this.props.reduxLocalStates || [];
        reduxLocalStates.splice(index, 1);
        chrome.storage.local.set({ 'reduxStates': reduxLocalStates });
        this.props.refreshLocalStorageData();
    }

    reStoreStates(savedStates) {
        const dispatchAction = this.state.dispatchAction;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { action: "setState", state: savedStates, dispatchAction },
                function (response) {
                    //success
                });
        });
    }

    setDispatchAction(actionObj) {
        const data = JSON.stringify(actionObj, null, 2);
        chrome.storage.local.set({ 'dispatchAction': data });
        this.setState({ dispatchAction: data });
    }

    render() {
        return (
            <div>
                <div>
                    <label className="text-primary">Saved States</label>
                    <div className="text-right vr-gutter">
                        <a className="helper"
                            onClick={() => { this.setState({ editEnabled: !this.state.editEnabled }) }}
                        >Configure dispatch action {this.state.editEnabled ? "^" : ">"}</a>
                    </div>
                    {this.state.editEnabled &&
                        <DispatchActionForm
                            dataInJSON={this.state.dispatchAction}
                            updateJSON={this.setDispatchAction} />
                    }
                </div>
                <ul className="list">
                    {
                        this.props.reduxLocalStates.length === 0 &&
                        <li>No saved state available!</li>
                    }
                    {
                        this.props.reduxLocalStates.map((storedState, index) => {
                            return <li key={'state_' + index}>
                                <a onClick={() => { this.reStoreStates(storedState.data) }}>{storedState.key}</a>
                                <a className="delete-link" onClick={() => { this.deleteSavedState(index) }}>X</a>
                                <span className="pull-right">{new Date(storedState.dateTime).toLocaleString()}</span>
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

SavedSates.propTypes = {
    storeData: PropTypes.object,
    refreshLocalStorageData: PropTypes.func,
    reduxLocalStates: PropTypes.array
}

export default SavedSates;
