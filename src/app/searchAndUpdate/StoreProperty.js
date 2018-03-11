import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JSONForm from '../form/JSONForm';

class StoreProperty extends Component {

    constructor(props) {
        super(props);
        this.state = { showPropertyValue: false };
    }

    render() {
        return (
            <li>
                <a onClick={() => { this.setState({ showPropertyValue: !this.state.showPropertyValue }) }}>
                    {this.props.propValuePair.key}
                </a>
                {
                    this.state.showPropertyValue &&
                    <JSONForm
                        dataInJSON={JSON.stringify(this.props.propValuePair.value,null,2)}
                        updateJSON={()=>{}}
                    />
                }
            </li>
        );
    }
}

StoreProperty.propTypes = {
    propValuePair: PropTypes.object
}

export default StoreProperty;
