import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SaveAndReset from '../saveAndReset/SaveAndReset';
import SearchAndUpdate from '../searchAndUpdate/SearchAndUpdate';


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
            { title: 'Search & Update', component: <SearchAndUpdate  {...this.props} /> }
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

Tab.propTypes = {
    storeData: PropTypes.object,
    refreshLocalStorageData: PropTypes.func,
    reduxLocalStates: PropTypes.array
}

export default Tab;
