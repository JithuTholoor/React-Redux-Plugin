import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Field extends Component {

    constructor(props) {
        super(props);
        this.state = {value:''};
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({ value: event.target.value });
        this.props.onChange && this.props.onChange(event.target.value);
    }

    render() {
        const { placeholder,onChange, ...props } = this.props;
        return (
            <div className="field">
                <input className={this.state.value ? '' : 'empty'} value={this.state.value}
                    onChange={this.onChange} {...props} />
                <label>{placeholder}</label>
            </div>
        );
    }
}

Field.propTypes={
    onChange:PropTypes.func
}

export default Field;
