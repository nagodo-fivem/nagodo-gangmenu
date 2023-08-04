import React, { useState, useEffect } from 'react'
import { Role } from './role'
import { RoleEditing, RoleEditingData } from './role-editing';
import { fetchNui } from "../../../utils/fetchNui";
import '../../../css/rolespage.css'

function LoadingRoles() {
    return (
        <div className="loading">
            <p>Loading...</p>
        </div>
    )
}

interface IRole {
    id: number;
    name: string;
}

export function RolesPage() {
    const [roles, setRoles] = useState<IRole[]>([{id: 1, name: 'Præsident'}, {id: 2, name: 'Vice-Præsident'}])
    const [editing, setEditing] = useState(true);

    async function FetchRoles() {
        fetchNui<any>('fetchRoles', {}).then(
            (response) => {
                setRoles(response);
            }
        );
    }

    useEffect(() => {
        FetchRoles();
    }, [])

    function StartEditing(role_id: number) {
        
        setEditing(true);
    }

    function StopEditing() {
        setEditing(false);
    }

    function SaveRole() {
        setEditing(false);
    }

    if (roles === undefined || roles === null || roles.length === 0) {
        return (
            <div className="roles">
                <LoadingRoles />
            </div>
        )
    }

    if (editing) {
        return (
            <div className="role-editing">
                <RoleEditing stopEditing = {StopEditing} saveRole = {SaveRole}/>
            </div>
            
        )
    }

    return (
        <div className="roles">
            {roles.map((role) => {
                return (
                    <Role id={role.id} name={role.name} startEditing={StartEditing} />
                )
            })}
        </div>
    );
}