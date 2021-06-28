import React from 'react';
import { makeStyles } from '@material-ui/core';

// create styles using makeStyles
const useStyles = makeStyles({
    sideMenu:{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: 0,
        width: 320,
        height: '100%',
        backgroundColor: '#253053'
    }
})

const SideMenu = () => {
    const classes = useStyles();

    return (
        <div className={classes.sideMenu}>
            
        </div>
    )
}

export default SideMenu
