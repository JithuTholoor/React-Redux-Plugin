import React, { Component } from 'react';
import SaveAndReset from './saveAndReset/SaveAndReset';
import SearchAndUpdate from './searchAndUpdate/SearchAndUpdate';

class Tab extends Component {

    constructor(props) {
        super(props);
        this.state = { tabIndex: 0 };
        this.tabChange = this.tabChange.bind(this);
    }

    tabChange(val) {
        this.setState({ tabIndex: val });
    }

    render() {
        let tabs = [
            { title: 'Save & Reset', component: <SaveAndReset {...this.props} /> },
            { title: 'View & Update', component: <SearchAndUpdate  {...this.props}/> }
        ];
        return (
            <section>
                <nav className="container">
                    {
                        tabs.map((tab, index) => {
                            return <a
                                key={index}
                                className={this.state.tabIndex === index ? "active" : ""}
                                onClick={() => { this.tabChange(index) }}>{tab.title}
                            </a>
                        })
                    }
                </nav>
                <div className="tab-container container">
                    {tabs[this.state.tabIndex].component}
                </div>
            </section>
        );
    }
}

export default Tab;
