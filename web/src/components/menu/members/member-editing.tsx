import React, { useEffect, useRef, useState } from 'react';
import { RankSelector } from './rank-selector';
import { fetchNui } from "../../../utils/fetchNui";
import { _T } from '../../../utils/translation';

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
    KickMember: Function;
}

interface KickBtnProps {
    text: string;
    callback: Function;
}

function KickBtn(props: KickBtnProps) {
    const [hasPermission, setHasPermission] = useState(true);

    async function fetchPermission() {
        fetchNui<boolean>('fetchPermission', {permission_name: "kick_member"}).then(
            (response) => {
                setHasPermission(response);
            }
        );
    } 

    useEffect(() => {
        setHasPermission(false);      
        fetchPermission();
    }, [])
    
    if (!hasPermission) return null;

    return (
        <div className="action" onClick={() => {props.callback()}}>
            <p>{_T(props.text)}</p>
        </div>
    );
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

    function handleKickMember() {
        if (_memberData.current !== undefined) {
            props.KickMember(_memberData.current.id)
        }
    }
    
    if (memberData === undefined || memberData === null) {
        return (
            <div className="editor">

                <div className="current-edit">
                    <p className="info name">{_T('loading')}</p>
                    <p className="info rank"></p>
                </div>
            </div>
        );
    }

    return (
        <div className="editor">

            <div className="current-edit">
                <p className="info name">{_T('editing') + memberData.name}</p>
                <p className="info rank">{_T('current_role') + memberData.rankName}</p>
            </div>

            <div className="rank-selector">
                <RankSelector selectedRankId = {memberData.rankId} updateMemberRank={updateMemberRank} />
            </div>

            <div className= "actions" >
                <KickBtn text = "kick_member" callback = {handleKickMember} />
            </div>

            <div className = "main-btns">

                <div className="cancel btn" onClick={() => {props.stopEditing()}}>
                    <p className="text">{_T('cancel')}</p>
                </div>

                <div className="save btn" onClick={() => {props.saveMember(_memberData)}}>
                    <p className="text">{_T('save')}</p>
                </div>
                
            </div>
        </div>
    );
}