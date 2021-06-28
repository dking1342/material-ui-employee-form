import React from 'react'
import { withStyles } from '@material-ui/core';

// create styles using withStyles
const style = {
    sideMenu:{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: 0,
        width: 320,
        height: '100%',
        backgroundColor: '#253053'
    }
}

const SideMenuWithStyles = (props) => {
    const { classes } = props;

    return (
        <div className={ classes.sideMenu }>
            
        </div>
    )
}

export default withStyles(style)(SideMenuWithStyles)
