import React, { useState } from 'react';
import '../../../css/checkmark.css'

interface PermissionCheckmarkProps {
    checked: boolean;
    checkMarkToggled: Function;
}

export function PermissionCheckmark(props: PermissionCheckmarkProps) {
    const [checked, setChecked] = useState(props.checked);

    function toggleCheckmark() {
        props.checkMarkToggled(!checked);
        setChecked(!checked);
    }

   
    if (checked) {
        return (
            <div className= "checkmark checked" onClick={() => {toggleCheckmark()}}>
                <i className="fas fa-check"></i>
            </div>
        )
    }

    return (
        <div className= "checkmark" onClick={() => {toggleCheckmark()}}>

        </div>
    )
}