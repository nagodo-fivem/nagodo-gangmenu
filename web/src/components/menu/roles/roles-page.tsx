import React, { useState, useEffect } from 'react'
import { Role } from './role'
import { RoleEditing } from './role-editing';
import { RoleData } from './role-editing';
import { fetchNui } from "../../../utils/fetchNui";
import '../../../css/rolespage.css'
import { MemberData } from '../members/member-editing';

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
    playerAmount: number;
}

export function RolesPage() {
    const [roles, setRoles] = useState<IRole[]>([])
    const [currentRoleId, setCurrentRoleId] = useState<number>(-1);
    const [editing, setEditing] = useState(false);

    async function fetchRoles() {
        fetchNui<any>('fetchRoles').then(
            (response) => {
                //Sort by id descending
                response.sort((a: IRole, b: IRole) => {
                    return b.id - a.id;
                })
                setRoles(response);
            }
        );
    }

    useEffect(() => {
        fetchRoles();
    }, [])

    function startEditing(role_id: number) {
        setCurrentRoleId(role_id);
        setEditing(true);
    }

    function stopEditing() {
        setCurrentRoleId(-1);
        setEditing(false);
    }

    function saveRole(newData: RoleData) {
        fetchNui<any>('saveRole', {newData}).then(
            (response) => {
                fetchRoles();
            }
        );
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
                <RoleEditing stopEditing = {stopEditing} saveRole = {saveRole} role_id={currentRoleId}/>
            </div>
            
        )
    }

    return (
        <div className="roles">
            {roles.map((role) => {
                return (
                    <Role id={role.id} name={role.name} playerAmount = {role.playerAmount} startEditing={startEditing} />
                )
            })}
        </div>
    );
}