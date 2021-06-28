import { makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { } from 'react'

const useStyles = makeStyles( theme => ({
    root:{
        top:theme.spacing(9)
    }
}))

const Notification = (props) => {

    const classes = useStyles();

    const handleClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        props.setNotify({
            ...props.notify,
            isOpen:false
        })
    }

    return (
        <Snackbar
            open={props.notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{vertical:'top',horizontal:'right'}}
            className={classes.root}
            onClose={handleClose}
        >
            <Alert
                severity={props.notify.type}
                onClose={handleClose}
            >
                {props.notify.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification
