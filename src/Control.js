import React, { Component } from 'react';

class Control extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let className = 'control';

        if (this.props.background) {
            className += ' background-' + this.props.background;
        }

        if (this.props.size) {
            className += ' size-' + this.props.size;
        }

        if (this.props.active === true){
            className += ' active';
        }

        return (
            <div onClick={() => {
                if (this.props.onClick) {
                    this.props.onClick(this);
                }
            }} className={className}>
                {this.props.children}
            </div>
        )
    }
}

export default Control;