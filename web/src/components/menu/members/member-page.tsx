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
    const [members, setMembers] = useState<IMember[]>([{name: 'John Olsen', rank: 'Præsident'}])
    const [editing, setEditing] = useState(false);
    const [editingData, setEditingData] = useState<MemberEditingData>();

    async function FetchMembers() {
        fetchNui<any>('fetchMembers', {}).then(
            (response) => {
                setMembers(response);
            }
        );
    }

    useEffect(() => {
        FetchMembers();
    }, [])

    function StartEditing(member_id: number) {
        
        setEditing(true);
    }

    function StopEditing() {
        setEditing(false);
    }

    function SaveMember() {
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
                <MemberEditing stopEditing = {StopEditing} saveMember = {SaveMember}/>
            </div>
            
        )
    }

    return (
        <div className="members">
            <Member name = "John Olsen" rank = "Din mor" startEditing={StartEditing} />
            <Member name = "John Olsen" rank = "Din mor" startEditing={StartEditing} />
            <Member name = "John Olsen" rank = "Din mor" startEditing={StartEditing} />
            <Member name = "John Olsen" rank = "Din mor" startEditing={StartEditing} />
            <Member name = "John Olsen" rank = "Din mor" startEditing={StartEditing} />
            <Member name = "John Olsen" rank = "Din mor" startEditing={StartEditing} />
            <Member name = "John Olsen" rank = "Din mor" startEditing={StartEditing} />
            <Member name = "John Olsen" rank = "Din mor" startEditing={StartEditing} />
            <Member name = "John Olsen" rank = "Din mor" startEditing={StartEditing} />
            <Member name = "John Olsen" rank = "Din mor" startEditing={StartEditing} />
            <Member name = "John Olsen" rank = "Din mor" startEditing={StartEditing} />
            <Member name = "John Olsen" rank = "Din mor" startEditing={StartEditing} />
        </div>
    )
    
}