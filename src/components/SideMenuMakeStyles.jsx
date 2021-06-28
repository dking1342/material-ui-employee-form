import React from 'react'
import { IconButton, makeStyles } from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

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
    },
    btn:{
        backgroundColor:'#ff0000'
    },
    btnLabel:{
        backgroundColor:'#00ff00'
    }
})

const SideMenuMakeStyles = () => {
    const classes = useStyles();


    return (
        <div className={classes.sideMenu}>
            {/* this is using the classes attribute to style components or elements with some specificiation */}
            <IconButton classes={{root:classes.btn,label:classes.btnLabel}}>
                <NotificationsNoneIcon />
            </IconButton>
        </div>
    )
}

export default SideMenuMakeStyles
