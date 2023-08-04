import React from 'react';
import { NameChanger } from './name-changer';
import { PermissionChanger } from './permission-changer';

export interface RoleEditingData {
    id: number;
    name: string;
}

interface RoleEditingProps {
    stopEditing: Function;
    saveRole: Function;
}

export function RoleEditing(props: RoleEditingProps) {
    return (
        <div className='editor'>
            <div className="current-edit">
                <p className="info name">Editing: Præsident</p>
            </div>

            <div className='name-changer'>
                <NameChanger />
            </div>

            <div className='permission-changer'>
                <PermissionChanger />
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