import React, { useState, useEffect } from 'react';
import { fetchNui } from '../../../utils/fetchNui';
import { _T } from '../../../utils/translation';

interface NameChangerProps {
    currentName: string;
    setCurrentName: Function;
}

export function NameChanger(props: NameChangerProps) {
    const [hasPermission, setHasPermission] = useState(false);

    async function fetchPermission() {
        fetchNui<boolean>('fetchPermission', {permission_name: "change_role_name"}).then(
            (response) => {
                setHasPermission(response);
            }
        );
    }

    useEffect(() => {
        setHasPermission(false);
        fetchPermission();
    }, [])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        props.setCurrentName(event.target.value);
    }

    return (
        <div className="changer">
            <p className='title'>{_T('change_role_name')}</p>
            <input type="text" className="name-input" onChange={handleChange} readOnly = {!hasPermission} />
        </div>
    )
}