import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from '../form/Field';
import {findMatchingProps} from '../util/util';

class SearchAndUpdate extends Component {

    constructor(props) {
        super(props);
        this.state={};
    }

    getSearchResult(){
        const result=[];
        findMatchingProps(this.props.storeData,this.state.search,result);
        return result.map((key)=>{
            return <li><a>{key}</a></li>
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
                <pre>
                {/*JSON.stringify(this.props.storeData, null, 4)*/}
                </pre>
            </div>
        );
    }
}

SearchAndUpdate.propTypes={
    storeData:PropTypes.object,
    refreshLocalStorageData:PropTypes.func,
    reduxLocalStates:PropTypes.array
}

export default SearchAndUpdate;
