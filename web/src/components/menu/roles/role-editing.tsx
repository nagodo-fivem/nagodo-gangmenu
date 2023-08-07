import React, { useEffect, useState } from 'react';
import { NameChanger } from './name-changer';
import { PermissionChanger } from './permission-changer';
import { Permission }  from './permission-changer';
import { fetchNui } from "../../../utils/fetchNui";

interface RoleData {
    id: number;
    name: string;
    permissions: Permission[];
}

interface RoleEditingProps {
    role_id: number;
    stopEditing: Function;
    saveRole: Function;
}

export function RoleEditing(props: RoleEditingProps) {
    const [roleData, setRoleData] = useState<RoleData>();

    async function fetchRole(role_id: number) {
        fetchNui<any>('fetchRoleData', {role_id}).then(
            (response) => {
                setRoleData(response);
            }
        );
    }

    useEffect(() => {
        fetchRole(props.role_id);
    }, [])

    if (roleData === undefined || roleData === null) {
        return (
            <div className='editor'>
                <div className="current-edit">
                    <p className="info name">Loading...</p>
                </div> 
            </div>
        );
    }

    return (
        <div className='editor'>
            <div className="current-edit">
                <p className="info name">Editing: {roleData.name}</p>
            </div>

            <div className='name-changer'>
                <NameChanger />
            </div>

            <div className='permission-changer'>
                <PermissionChanger permissions = {roleData.permissions} />
            </div>

            <div className = "main-btns">

                <div className="cancel btn" onClick={() => {props.stopEditing()}}>
                    <p className="text">Cancel</p>
                </div>

                <div className="save btn" onClick={() => {props.saveRole()}}>
                    <p className="text">Save</p>
                </div>
                
            </div>
        </div>
    );
}