import { makeStyles } from '@material-ui/core'
import {useState} from 'react'


export const useForms = (initialState, validateOnChange=false,validate) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({...values, [name]: value});

        if(validateOnChange){
            validate({[name]:value})
        }
    }

    const resetForm = () => {
        setValues(initialState);
        setErrors({})
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleChange,
        resetForm
    }
}

const useStyles = makeStyles(theme => ({
    root:{
        '& .MuiFormControl-root':{
            width:'80%',
            margin:theme.spacing(1),
        }
    }
}))

export const Form = (props) => {
    const classes = useStyles();
    const { children, ...other } = props;

    return(
        <form className={classes.root} autoComplete='off' {...other}>
            {props.children}
        </form>
    )
}

