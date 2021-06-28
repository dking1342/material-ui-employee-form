import { ButtonGroup, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import {Form, useForms} from '../../components/useForms';
import * as employeeService from '../../services/employeeService';
import Controls from './../../components/controls/Controls';

const genderItems = [
    {
        id:'male',
        title: 'Male'
    },
    {
        id:'female',
        title:'Female'
    },
    {
        id:'other',
        title:'Other'
    }
]

const initialState ={
    id:0,
    fullName:'',
    email:'',
    mobile:'',
    city:'',
    gender:'male',
    departmentId:'',
    hireDate:new Date(),
    isPermanent:false
}

const EmployeeForm = (props) => {
    const { addOrEdit, recordForEdit } = props;

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : 'This field is required';
        if('email' in fieldValues)
            temp.email = (/$^|.+@..+/).test(fieldValues.email) ? "" : 'Email is not valid';
        if('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : 'Minimum of 10 numbers required';
        if('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length !== 0 ? "" : 'This field is required';

        setErrors({
            ...temp
        })
        if(fieldValues === values){
            return Object.values(temp).every(x => x === '');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validate()){
            addOrEdit(values,resetForm);
        }
    }

    const {
        values, 
        setValues,
        errors, 
        setErrors, 
        handleChange, 
        resetForm 
    } = useForms(initialState, true, validate);
    
    useEffect(()=>{
        if(recordForEdit !== null){
            setValues({
                ...recordForEdit
            })
        }
    },[recordForEdit,setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs>
                    <Controls.Input
                        name="fullName"
                        value = {values.fullName}
                        label="Full Name"
                        onChange = {handleChange}
                        error={errors.fullName}
                    />
                    <Controls.Input
                        name='email'
                        label="Email"
                        value={values.email}
                        onChange = {handleChange}
                        error={errors.email}
                    />
                    <Controls.Input 
                        name='mobile'
                        label='Mobile'
                        value={values.mobile}
                        onChange={handleChange}
                        error={errors.mobile}
                    />
                    <Controls.Input 
                        name='city'
                        label='City'
                        value={values.city}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs>
                    <Controls.RadioGroup
                        name='gender'
                        label='Gender'
                        value={values.gender}
                        onChange={handleChange}
                        items = {genderItems}
                    />
                    <Controls.Select 
                        name='departmentId'
                        label='Department'
                        value={values.departmentId}
                        onChange={handleChange}
                        options={employeeService.getDepartmentCollection()}
                        error={errors.departmentId}
                    />
                    <Controls.DatePicker 
                        name='hireDate'
                        label='Hire Date'
                        value={values.hireDate}
                        onChange={handleChange}
                    />
                    <Controls.Checkbox 
                        name='isPermanent'
                        label='Permanent Employee'
                        value={values.isPermanent}
                        onChange={handleChange}
                    />
                    <ButtonGroup
                        color='primary'
                        variant='contained'
                        disableElevation
                    >
                        <Controls.Button 
                            type='submit'
                            text='Submit'
                        />
                        <Controls.Button 
                            text='Reset'
                            color='default'
                            onClick={resetForm}
                        />
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Form>

    )
}

export default EmployeeForm
