import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DispatchActionFrom extends Component {

    constructor(props) {
        super(props);
        this.validateAndUpdate=this.validateAndUpdate.bind(this);
        this.state={jsonValidity:true};
    }

    validateAndUpdate(eve){
        try{
            const data=JSON.parse(eve.target.innerText);
            this.setState({jsonValidity:true});
            this.props.updateJSON(data);
        }catch(error){
            if(error.name==="SyntaxError"){
                this.setState({jsonValidity:false})
            }
        }
    }

    
    render() {
        return (
            <pre contentEditable suppressContentEditableWarning="true"
                onBlur={this.validateAndUpdate}
                className={this.state.jsonValidity?"text-area":"text-area error"}>
                {this.props.dataInJSON}
            </pre>
        );
    }
}

DispatchActionFrom.propTypes={
    updateJSON:PropTypes.func,
    dataInJSON:PropTypes.string
}

export default DispatchActionFrom;
