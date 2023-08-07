import React, { useEffect, useRef, useState } from 'react';
import { RankSelector } from './rank-selector';
import { fetchNui } from "../../../utils/fetchNui";

export interface MemberData {
    id: string;
    name: string;
    rankId: number;
    rankName: string;
}

interface MemberEditingProps {
    member_id: string;
    stopEditing: Function;
    saveMember: Function;
}

export function MemberEditing(props: MemberEditingProps) {
    let _memberData = useRef<MemberData>();
    const [memberData, setMemberData] = useState<MemberData>();

    async function fetchMember(member_id: string) {
        fetchNui<any>('fetchMemberData', {member_id}).then(
            (response) => {
                _memberData.current = response;
                setMemberData(response);
            }
        );
    }

    useEffect(() => {
        fetchMember(props.member_id);
    }, [])

    function updateMemberRank(id: number)
    {
        if (_memberData.current !== undefined) {
            _memberData.current.rankId = id;
        }    
    }
    
    if (memberData === undefined || memberData === null) {
        return (
            <div className="editor">

                <div className="current-edit">
                    <p className="info name">Loading...</p>
                    <p className="info rank"></p>
                </div>
            </div>
        );
    }

    return (
        <div className="editor">

            <div className="current-edit">
                <p className="info name">Editing: {memberData.name}</p>
                <p className="info rank">Rank: {memberData.rankName}</p>
            </div>

            <div className="rank-selector">
                <RankSelector selectedRankId = {memberData.rankId} updateMemberRank={updateMemberRank} />
            </div>

            <div className = "main-btns">

                <div className="cancel btn" onClick={() => {props.stopEditing()}}>
                    <p className="text">Cancel</p>
                </div>

                <div className="save btn" onClick={() => {props.saveMember(_memberData)}}>
                    <p className="text">Save</p>
                </div>
                
            </div>
        </div>
    );
}