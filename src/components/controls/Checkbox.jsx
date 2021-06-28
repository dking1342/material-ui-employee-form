import React from 'react';
import { Checkbox as MuiCheckbox, FormControl, FormControlLabel } from '@material-ui/core';

const Checkbox = (props) => {
    const { name, label, onChange, value } = props;

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <FormControl>
            <FormControlLabel 
                control={
                    <MuiCheckbox 
                        name={name}
                        color='primary'
                        checked={value}
                        onChange={e => onChange(convertToDefEventPara(name,e.target.checked))}
                    />
                }
                label={label}
            />
        </FormControl>
    )
}

export default Checkbox
