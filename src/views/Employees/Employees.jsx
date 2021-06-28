import React, { useState } from 'react'

// components
import PageHeader from './../../components/PageHeader';
import EmployeeForm from './EmployeeForm';
import Notification from './../../components/Notification';
import ConfirmDialog from './../../components/ConfirmDialog';

// material-ui components
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';

// reuseable components
import useTable from './../../components/useTable';
import Controls from './../../components/controls/Controls';

// icons
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Popup from '../../components/Popup';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';

// local storage
import { deleteEmployee, getAllEmployees, insertEmployee, updateEmployee } from '../../services/employeeService';

// material-ui styles
const useStyles = makeStyles( theme => ({
    pageContent:{
        margin:theme.spacing(5),
        padding:theme.spacing(3)
    },
    searchInput:{
        width:'75%'
    },
    newButton:{
        position:'absolute',
        right:'10px'
    }
}))

// state for the table head
const headCells = [
    {
        id:'fullName',
        label:'Employee Name'
    },
    {
        id:'email',
        label:'Email Address'
    },
    {
        id:'mobile',
        label:'Mobile Number'
    },
    {
        id:'department',
        label:'Department',
    },
    {
        id:'actions',
        label:"Actions",
        disableSorting:true
    }
]

const Employees = () => {
    // init material-ui styles
    const classes = useStyles();

    // state
    const [records, setRecords] = useState(getAllEmployees());
    const [filterFn, setFilterFn] = useState({fn:employeeRows => { return employeeRows}});
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState();
    const [notify, setNotify] = useState({isOpen:false,message:'',type:''});
    const [confirmDialog, setConfirmDialog] = useState({isOpen:false,title:'',subTitle:''})

    // external reuseable components
    const { 
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    // event to search for employees in the table based on the user input
    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
            fn: employeeRows => {
                if(target.value === '')
                    return employeeRows;
                else
                    return employeeRows.filter(employeeRow => employeeRow.fullName.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }

    // event when user enters popup modal for new employee the resets the UI with new employee added to table
    const addOrEdit = (employee,resetForm) => {
        setNotify({
            isOpen:true,
            message:'Submitted Successfully',
            type:'success'
        })
        if(employee.id === 0){
            insertEmployee(employee)
        } else {
            updateEmployee(employee)
        }
        setRecordForEdit(null);
        resetForm();
        setOpenPopup(false);
        setRecords(getAllEmployees());
    }

    // opens popup for edit of employee
    const openInPopup = (record) => {
        setRecordForEdit(record);
        setOpenPopup(true);
    }

    const onDelete = (id) => {
        deleteEmployee(id);
        setRecords(getAllEmployees());
        setNotify({
            isOpen:true,
            message:'Deleted Successfully',
            type:'error'
        })
        setConfirmDialog({
            ...confirmDialog,
            isOpen:false
        })
    }

    return (
        <>
            <PageHeader 
                title="New Employee"
                subTitle="Form design with validation"
                icon={<PeopleOutlineIcon fontSize="large"/>}
            />
            <Paper className={classes.pageContent} >
                <Toolbar>
                    <Controls.Input 
                        className={classes.searchInput}
                        label='Search Employees' 
                        onChange={handleSearch}                     
                        InputProps={{
                            startAdornment:(
                                <InputAdornment position='start'>
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                    <Controls.Button 
                        text='Add New'
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick = {()=> {
                            setOpenPopup(true); 
                            setRecordForEdit(null);
                        }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map((record,i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        {record.fullName}
                                    </TableCell>
                                    <TableCell>
                                        {record.email}
                                    </TableCell>
                                    <TableCell>
                                        {record.mobile}
                                    </TableCell>
                                    <TableCell>
                                        {record.department}
                                    </TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color='primary'
                                            onClick={()=> openInPopup(record)}
                                        >
                                            <EditIcon 
                                                fontSize='small'
                                            />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color='secondary'
                                            onClick={()=>{
                                                setConfirmDialog({
                                                    isOpen:true,
                                                    title:'Are you sure you want to delete this employee?',
                                                    subTitle:'You cannot undo this action',
                                                    onConfirm: ()=> onDelete(record.id)
                                                })
                                            }}
                                        >
                                            <CloseIcon 
                                                fontSize='small'
                                            />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup 
                openPopup = {openPopup}
                setOpenPopup = {setOpenPopup}
                title="Employee Form"
            >
                <EmployeeForm 
                    addOrEdit={addOrEdit}
                    recordForEdit={recordForEdit}
                />
            </Popup>
            <Notification 
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog 
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}

export default Employees
