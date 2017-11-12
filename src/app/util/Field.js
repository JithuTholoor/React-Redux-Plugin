import React, { Component } from 'react';

class Field extends Component {

    constructor(props) {
        super(props);
        this.state = {};
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

export default Field;
