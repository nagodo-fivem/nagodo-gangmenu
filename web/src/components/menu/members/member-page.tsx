import React, { useState, useEffect } from 'react'
import { Member } from './member'
import { MemberEditing, MemberEditingData } from './member-editing';
import { fetchNui } from "../../../utils/fetchNui";
import '../../../css/memberspage.css'

function LoadingMembers() {
    return (
        <div className="loading">
            <p>Loading...</p>
        </div>
    )
}

interface IMember {
    name: string;
    rank: string;
}

export function MembersPage() {
    const [members, setMembers] = useState<IMember[]>([])
    const [editing, setEditing] = useState(false);
    const [editingData, setEditingData] = useState<MemberEditingData>();

    async function fetchMembers() {
        fetchNui<any>('fetchMembers').then(
            (response) => {
                setMembers(response);
            }
        );
    }

    useEffect(() => {
        fetchMembers();
    }, [])

    function startEditing(member_id: number) {
        
        setEditing(true);
    }

    function stopEditing() {
        setEditing(false);
    }

    function saveMember() {
        setEditing(false);
    }

    if (members === undefined || members === null || members.length === 0) {
        return (
            <div className="members">
                <LoadingMembers />
            </div>
        )
    }

    if (editing) {
        return (
            <div className="member-editing">
                <MemberEditing stopEditing = {stopEditing} saveMember = {saveMember}/>
            </div>
            
        )
    }

    return (
        <div className="members">
            {members.map((member, index) => {
                return (
                    <Member key={index} name={member.name} rank={member.rank} startEditing={startEditing} />
                )
            })}
        </div>
    )
    
}