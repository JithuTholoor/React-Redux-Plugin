import React, { Component } from 'react';

class App extends Component {
    
    constructor(props){
        super(props);
        this.state={storeData:'212'};
    }

    componentDidMount() {
        const _this=this;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "getStore" }, function (response) {
                _this.setState({ 'storeData': JSON.stringify(JSON.parse(response.data), null, 4) });
            });
        });
    }

    render() {
        return (
            <div className="app">
                React Store Manager
                {
                    this.state.storeData &&
                    <pre>
                        {this.state.storeData}
                    </pre>
                }
            </div>
        );
    }
}

export default App;
