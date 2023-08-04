import React, { useState, useEffect } from 'react';
import { PermissionCheckmark } from './permission-checkmark';
import { fetchNui } from "../../../utils/fetchNui";

function LoadingPermissions() {
    return (
        <div className="loading">
            <p>Loading permissions...</p>
        </div>
    )
}

interface PermissionProps {
    name: string;
    checked: boolean;
}

function Permission(props: PermissionProps) {
    return (
        <div className="permission">
            <PermissionCheckmark checked = {props.checked}/>
            <p className='text'>{props.name}</p>
        </div>
    )
}

interface IPermission {
    name: string;
    checked: boolean;
}

export function PermissionChanger() {
    const [permissions, setPermissions] = useState<IPermission[]>([{name: 'Tilgå lager', checked: false}]);

    async function FetchPermissions() {
        fetchNui<any>('fetchPermissions', {}).then(
            (response) => {
                setPermissions(response);
            }
        );
    }

    useEffect(() => {
        FetchPermissions();
    }, [])

    if (permissions === undefined || permissions === null || permissions.length === 0) {
        return (
            <div className="changer">
                <LoadingPermissions />
            </div>
        )
    }

    return (
        <div className="changer">
            {permissions.map((permission) => (
                <Permission name = {permission.name} checked = {permission.checked} />
            ))}
        </div>
    )
}