import React, { useState, useEffect } from 'react';
import { PermissionCheckmark } from './permission-checkmark';
import { fetchNui } from "../../../utils/fetchNui";
import { _T } from '../../../utils/translation';

function LoadingPermissions() {
    return (
        <div className="loading">
            <p>Loading permissions...</p>
        </div>
    )
}

export interface Permission {
    identifier: string;
    label: string;
    enabled: boolean;
}

interface PermissionProps {
    identifier: string;
    name: string;
    checked: boolean;
    checkMarkToggled: Function;
    interactable: boolean;
}

function Permission(props: PermissionProps) {

    function handleToggle(checked: boolean) {
        if (!props.interactable) return;

        props.checkMarkToggled(props.identifier, checked);
    }

    return (
        <div className="permission">
            <PermissionCheckmark checked = {props.checked} checkMarkToggled = {handleToggle} hasPermission = {props.interactable}/>
            <p className='text'>{_T(props.name)}</p>
        </div>
    )
}

interface PermissionChangerProps {
    permissions: Permission[];
    checkMarkToggled: Function;
}

export function PermissionChanger(props: PermissionChangerProps) {
    const [hasPermission, setHasPermission] = useState(false);

    async function fetchPermission() {
        fetchNui<boolean>('fetchIsBoss', {}).then(
            (response) => {
                console.log("Is booss: " + response);
                setHasPermission(response);
            }
        );
    } 

    useEffect(() => {
        setHasPermission(false);      
        fetchPermission();
    }, [])

    function sortedPermissions(permissions: Permission[]) {
        return permissions.sort((a, b) => {
            if (a.label < b.label) {
                return -1;
            } else if (a.label > b.label) {
                return 1;
            } else {
                return 0;
            }
        })
    }

    
    if (props.permissions === undefined || props.permissions === null || props.permissions.length === 0) {
        return (
            <div className="changer">
                <LoadingPermissions />
            </div>
        )
    }

    return (
        <div className="changer">
            {sortedPermissions(props.permissions).map((permission) => (
                <Permission identifier = {permission.identifier} interactable = {hasPermission} name = {permission.label} checked = {permission.enabled} checkMarkToggled = {props.checkMarkToggled} />
            ))}
        </div>
    )
}