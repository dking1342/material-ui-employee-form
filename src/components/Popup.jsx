import React from 'react';
import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import Controls from './../components/controls/Controls';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles( themes => ({
    dialogWrapper:{
        padding:themes.spacing(2),
        position:'absolute',
        top:themes.spacing(5)
    },
    dialogTitle:{
        display:'flex',
        paddingRight:'0px'
    },
    dialogTitleTypography:{
        flexGrow:1
    }
}))

const Popup = (props) => {
    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <Dialog
            open={openPopup}
            maxWidth='md'
            classes={{paper:classes.dialogWrapper}}
        >
            <DialogTitle>
                <div className={classes.dialogTitle}>
                    <Typography
                        className={classes.dialogTitleTypography}
                        variant='h6'
                        component='div'
                    >
                        {title}
                    </Typography>
                    <Controls.ActionButton 
                        color='secondary'
                        onClick={()=>setOpenPopup(false)}
                    >
                        <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent
                dividers
            >
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Popup
