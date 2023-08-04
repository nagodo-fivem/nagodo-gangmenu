import React from 'react';
import { RankSelector } from './rank-selector';

export interface MemberEditingData {
    id: number;
    name: string;
    rank: number;
}

interface MemberEditingProps {
    stopEditing: Function;
    saveMember: Function;
}

export function MemberEditing(props: MemberEditingProps) {
    return (
        <div className="editor">

            <div className="current-edit">
                <p className="info name">Editing: John Olsen</p>
                <p className="info rank">Rank: Præsident</p>
            </div>

            <div className="rank-selector">
                <RankSelector />
            </div>

            <div className = "main-btns">

                <div className="cancel btn" onClick={() => {props.stopEditing()}}>
                    <p className="text">Cancel</p>
                </div>

                <div className="save btn" onClick={() => {props.saveMember()}}>
                    <p className="text">Save</p>
                </div>
                
            </div>
        </div>
    );
}