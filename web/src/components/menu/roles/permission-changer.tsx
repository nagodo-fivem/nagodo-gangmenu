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

export interface Permission {
    identifier: string;
    label: string;
    enabled: boolean;
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

interface PermissionChangerProps {
    permissions: Permission[];
}

export function PermissionChanger(props: PermissionChangerProps) {
   
    if (props.permissions === undefined || props.permissions === null || props.permissions.length === 0) {
        return (
            <div className="changer">
                <LoadingPermissions />
            </div>
        )
    }

    return (
        <div className="changer">
            {props.permissions.map((permission) => (
                <Permission name = {permission.label} checked = {permission.enabled} />
            ))}
        </div>
    )
}