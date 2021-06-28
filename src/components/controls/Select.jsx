import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';
import React from 'react'

const Select = (props) => {
    const { name, label, value, onChange, options, error=null} = props;

    return (
        <FormControl
            variant='outlined'
            {...(error && {error:true})}
        >
            <InputLabel>
                {label}
            </InputLabel>
            <MuiSelect
                name={name}
                label={label}
                value={value}
                onChange={onChange}
            >
                {
                    options.map(option=>(
                        <MenuItem
                            value={option.id}
                            key={option.id}
                        >
                            {option.title}
                        </MenuItem>
                    ))
                }
            </MuiSelect>
            {
                error && <FormHelperText>{error}</FormHelperText>
            }
            
        </FormControl>
    )
}

export default Select
