import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from '../form/Field';
import { findMatchingProps } from '../util/util';
import StoreProperty from './StoreProperty';

class SearchAndUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getSearchResult() {
        if(!this.state.search){
            return;
        }
        const result = [];
        findMatchingProps(this.props.storeData, this.state.search, result);
        return result.map((propValuePair,index) => {
            return <StoreProperty key={`${propValuePair.key}${index}`} propValuePair={propValuePair}/>
        })
    }

    render() {
        return (
            <div>
                <Field placeholder="Search" onChange={(val) => { this.setState({ search: val }) }}
                    type="text" />
                <ul className="list">
                    {this.getSearchResult()}
                </ul>
            </div>
        );
    }
}

SearchAndUpdate.propTypes = {
    storeData: PropTypes.object,
    refreshLocalStorageData: PropTypes.func,
    reduxLocalStates: PropTypes.array
}

export default SearchAndUpdate;
