import React, { Component } from 'react';

class Like extends React.Component {
    render() { 
        let classes = "fa  fa-heart"
        if(!this.props.liked) classes+="-o"
        return <i onClick={this.props.onClick} style={{cursor:'pointer'}} className={classes}></i>;
    }
}
 
export default Like; 