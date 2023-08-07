import React, { useState, useEffect } from 'react'
import { Member } from './member'
import { MemberEditing } from './member-editing';
import { MemberData } from './member-editing';
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
    member_id: string;
    name: string;
    rank: string;
}

export function MembersPage() {
    const [members, setMembers] = useState<IMember[]>([])
    const [editing, setEditing] = useState(false);
    const [currentMemberId, setCurrentMemberId] = useState<string>("");

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

    function startEditing(member_id: string) {
        setCurrentMemberId(member_id);
        setEditing(true);
    }

    function stopEditing() {
        setEditing(false);
    }

    function saveMember(newData: MemberData) {
        fetchNui<any>('saveMember', {newData}).then(
            (response) => {
                fetchMembers();
            }
        );
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
                <MemberEditing stopEditing = {stopEditing} saveMember = {saveMember} member_id = {currentMemberId}  />
            </div>
            
        )
    }

    return (
        <div className="members">
            {members.map((member, index) => {
                return (
                    <Member key={index} name={member.name} rank={member.rank} member_id = {member.member_id} startEditing={startEditing} />
                )
            })}
        </div>
    )
    
}