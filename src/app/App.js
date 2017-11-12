import React, { Component } from 'react';
import Header from './Header';
import Tab from './Tab';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.getSavedState = this.getSavedState.bind(this);
    }

    componentDidMount() {
        const _this = this;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "getState" }, function (response) {
                if (response && response.state) {
                    _this.setState({ 'storeData': response.state});
                    _this.getSavedState();
                } else {
                    _this.setState({ 'storeData': 'Not_Found' });
                }
            });
        });
    }

    getSavedState() {
        const _this = this;
        chrome.storage.local.get("reduxStates", (savedData) => {
            this.setState({ reduxLocalStates: savedData.reduxStates });
        });
    }

    render() {
        return (
            <div className="app">
                <Header />
                {
                    this.state.storeData ?
                        this.state.storeData !== 'Not_Found' ?
                            <section>
                                <Tab storeData={this.state.storeData}
                                    refreshLocalStorageData={this.getSavedState()}
                                    reduxLocalStates={this.state.reduxLocalStates} />
                            </section>
                            :
                            <div>Not able to access store..!</div>
                        :
                        <div>
                            <div className="loader" />
                            <small>Attempting store connection</small>
                        </div>
                }
            </div>
        );
    }
}

export default App;
