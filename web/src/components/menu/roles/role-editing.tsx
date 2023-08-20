import React, { useEffect, useRef, useState } from 'react';
import { NameChanger } from './name-changer';
import { PermissionChanger } from './permission-changer';
import { Permission }  from './permission-changer';
import { fetchNui } from "../../../utils/fetchNui";
import { _T } from '../../../utils/translation';

export interface RoleData {
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
    let _roleData = useRef<RoleData>();
    const [roleData, setRoleData] = useState<RoleData>();

    async function fetchRole(role_id: number) {
        fetchNui<any>('fetchRoleData', {role_id}).then(
            (response) => {
                _roleData.current = response;
                setRoleData(response);
            }
        );
    }

    useEffect(() => {
        fetchRole(props.role_id);
    }, [])

    function updateRoleName(name: string)
    {
        if (_roleData.current !== undefined) {
            _roleData.current.name = name;
        }    
    }

    function updatePermission(name: string, value: boolean) {
        if (_roleData.current !== undefined) {
            _roleData.current.permissions.forEach((permission) => {
                if (permission.identifier === name) {
                    permission.enabled = value;
                }
            })
        }
    }

    if (roleData === undefined || roleData === null) {
        return (
            <div className='editor'>
                <div className="current-edit">
                    <p className="info name">{_T('loading')}.</p>
                </div> 
            </div>
        );
    }

    return (
        <div className='editor'>
            <div className="current-edit">
                <p className="info name">{_T('editing') + roleData.name}</p>
            </div>

            <div className='name-changer'>
                <NameChanger setCurrentName = {updateRoleName} currentName = {roleData.name} />
            </div> 

            <div className='permission-changer'>
                <PermissionChanger checkMarkToggled = {updatePermission} permissions = {roleData.permissions} />
            </div>

            <div className = "main-btns">

                <div className="cancel btn" onClick={() => {props.stopEditing()}}>
                    <p className="text">{_T('cancel')}</p>
                </div>

                <div className="save btn" onClick={() => {props.saveRole(_roleData)}}>
                    <p className="text">{_T('save')}</p>
                </div>
                
            </div>
        </div>
    );
}