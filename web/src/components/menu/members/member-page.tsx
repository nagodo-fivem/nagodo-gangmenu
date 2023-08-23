import React, { useState, useEffect } from 'react'
import { Member } from './member'
import { MemberEditing } from './member-editing';
import { MemberData } from './member-editing';
import { fetchNui } from "../../../utils/fetchNui";
import '../../../css/memberspage.css'
import { _T } from '../../../utils/translation';

function LoadingMembers() {
    return (
        <div className="loading">
            <p>{_T("loading")}</p>
        </div>
    )
}

interface IMember {
    member_id: string;
    name: string;
    rank: string;
}

function NewMemberInput(props: any) {
    if (!props.active) return null;

    function handleInputChange(event: any) {
        props.callback(event.target.value);
    }

    return (
        <div className='newMemberInput'>
            <div className="changer">
                <p className='title'>{_T("player_id")}</p>
                <input type="number" className="name-input" value={props.addMemberId} onChange={handleInputChange} />
            </div>
        </div>
    );
}

function AddNewMemberBtn(props: any) {
    const [hasPermission, setHasPermission] = useState(true);

    async function fetchPermission() {
        fetchNui<boolean>('fetchPermission', {permission_name: "add_new_member"}).then(
            (response) => {
                setHasPermission(response);
            }
        );
    } 

    useEffect(() => {
        setHasPermission(true);      
        fetchPermission();
    }, [])
    
    if (!hasPermission) {
        return (
            <div className='addNewMember not-pressable'>
                <p className='info'>{_T('add_new_member')}</p>
            </div>
        )
    };

    return (
        <div className='addNewMember' onClick={props.callback}>
            <p className='info'>{_T('add_new_member')}</p>
        </div>
    )
}

export function MembersPage() {
    const [members, setMembers] = useState<IMember[]>([])
    const [editing, setEditing] = useState(false);
    const [addingNewMember, setAddingNewMember] = useState(false);
    const [currentMemberId, setCurrentMemberId] = useState<string>("");
    const [addMemberId, setAddMemberId] = useState<number>(-1);
    const [manageMemberPermission, setManageMemberPermission] = useState<boolean>(true);

    async function fetchMembers() {
        fetchNui<any>('fetchMembers').then(
            (response) => {
                
                response.sort((a: any, b: any) => {
                    if (a.rank < b.rank) {
                        return -1;
                    }
                    if (a.rank > b.rank) {
                        return 1;
                    }
                    return 0;
                });

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

    function handleAddNewMemberBtn() {
        setAddingNewMember(true);
    }

    function handleCancelAddMember() {
        setAddingNewMember(false);
    }   

    function handleAcceptAddMember() {
        setAddingNewMember(false);
        fetchNui<any>('addNewMember', {member_id: addMemberId}).then(
            (response) => {
                setAddMemberId(-1);
                fetchMembers();
            }
        );
    }

    function handleKickMember(member_id: number) {
        console.log(member_id);
        fetchNui<any>('kickMember', {member_id: member_id}).then(
            (response) => {
                setEditing(false);
                fetchMembers();
            }
        );
    }

    function handleInputChange(value: number) {
        setAddMemberId(value);
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
                <MemberEditing KickMember={handleKickMember} stopEditing = {stopEditing} saveMember = {saveMember} member_id = {currentMemberId}  />
            </div>
            
        )
    }

    if (addingNewMember) {
        return (
            <div className="members">
                <NewMemberInput active = {addingNewMember} value = {addMemberId} callback = {handleInputChange}/>
                <div className = "main-btns">

                    <div className="cancel btn" onClick={() => {handleCancelAddMember()}}>
                        <p className="text">{_T('cancel')}</p>
                    </div>

                    <div className="save btn" onClick={() => {handleAcceptAddMember()}}>
                        <p className="text">{_T('add')}</p>
                    </div>
                
                </div>
            </div>
        );
    }

    return (
        <div className="members">
            <AddNewMemberBtn callback = {handleAddNewMemberBtn} />
            
            {members.map((member, index) => {
                return (
                    <Member key={index} name={member.name} rank={member.rank} member_id = {member.member_id} startEditing={startEditing} permission = {manageMemberPermission} />
                )
            })}
        </div>
    )
    
}