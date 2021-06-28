import React, { useState } from 'react';
import { makeStyles, Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    table:{
        marginTop: theme.spacing(3),
        '& thead th':{
            fontWeight:'600',
            color: theme.palette.primary.light,
            backgroundColor: theme.palette.info.light
        },
        '& tbody td':{
            fontWeight:'300',
        },
        '& tbody tr:hover':{
            backgroundColor:'#fffbf2',
            cursor:'pointer'
        }
    }
}))

const useTable = (records, headCells, filterFn) => {
    const classes = useStyles();
    const pages = [ 5, 10, 25 ];
    const [page, setPage ] = useState(0);
    const [rowsPerPage, setRowsPerPage ] = useState(pages[page]);
    const [ order, setOrder ] = useState('asc');
    const [orderBy, setOrderBy] = useState(null);

    const TblContainer = props => (
            <Table className={classes.table}>
                {props.children}
            </Table>
        )
    
    const TblHead = props => {

        const handleSortRequest = (cellId) => {
            const isAsc = orderBy === cellId && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc')
            setOrderBy(cellId)
        }

        return (
            <TableHead>
                <TableRow>
                    {
                        headCells.map((cell,i)=>(
                            <TableCell 
                                key={i}
                                sortDirection={orderBy === cell.id ? order : false}
                            >
                                {
                                    cell.disableSorting 
                                        ? cell.label 
                                        : <TableSortLabel
                                            active={orderBy === cell.id}
                                            direction = {orderBy === cell.id ? order:'asc'}
                                            onClick={()=> handleSortRequest(cell.id)}
                                          >
                                            {cell.label}
                                          </TableSortLabel>
                                }
                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        )
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value,10))
        setPage(0);
    }

    const TblPagination = () => (
        <TablePagination 
            component='div'
            page = { page }
            rowsPerPageOptions = { pages }
            rowsPerPage = { rowsPerPage }
            count={records.length}
            onChangePage = {handleChangePage}
            onChangeRowsPerPage = {handleChangeRowsPerPage}
        />
    )

    const stableSort = (array, comparator) => {
        const stablizedThis = array.map((el,index) => [el, index]);
        stablizedThis.sort((a,b) => {
            const order = comparator(a[0], b[0]);
            if(order !== 0) return order;
            return a[1] - b[1];
        })
        return stablizedThis.map((el) => el[0]);
    }

    const getComparator = (order, orderBy)=>{
        return order === 'desc'
            ? (a,b) => descendingComparator(a,b,orderBy)
            : (a,b) => -descendingComparator(a,b,orderBy);
    }

    const descendingComparator = (a,b,orderBy)=>{
        if(b[orderBy] < a[orderBy]){
            return -1;
        }
        if(b[orderBy] > a[orderBy]){
            return 1;
        }
        return 0;
    }
    
    const recordsAfterPagingAndSorting = () => {
        return stableSort(filterFn.fn(records),getComparator(order,orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }
}

export default useTable
