import React, { useState, useEffect } from 'react'
import { Ally } from './ally'
import '../../../css/alliespage.css'
import { _T } from '../../../utils/translation';
import { fetchNui } from '../../../utils/fetchNui';
import { AddAllyMenu } from './add-ally-menu';


function LoadingAllies() {
    return (
        <div className="loading">
            <p>{_T('loading')}</p>
        </div>
    )
}

interface IAlly {
    gangIdentifier: string;
    type: number;
    name: string;
}

interface AddAllyProps {
    callback: Function;
}

function AddNewAlly(props: AddAllyProps) {
    return (
        <div className="newally" onClick={() => {props.callback()}}>
            <p className='info name'>{_T('add_new_ally')}</p>
        </div>
    )
}

export function AlliesPage() {
    const [allies, setAllies] = useState<IAlly[]>([])
    const [addingAlly, setAddingAlly] = useState<boolean>(false);

    async function fetchAllies() {
        fetchNui<any>('fetchAllies').then(
            (response) => {
                setAllies(response);
            }
        );
    }

    useEffect(() => {
        fetchAllies();
    }, [])

    function handleAddAlly() {
        setAddingAlly(true);
    }

    function acceptAlly(gangIdentifier: string) {

    }

    function denyAlly(gangIdentifier: string) {

    }

    function cancelRequest(gangIdentifier: string) {

    }

    function removeAlly(gangIdentifier: string) {

    }

    if (addingAlly) {
        return (
            <div className="allies">
                <AddAllyMenu />
            </div>
        )
    }


    if (allies === undefined || allies === null || allies.length === 0) {
        return (
            <div className="allies">
                <AddNewAlly callback={handleAddAlly} />
                <LoadingAllies />
            </div>
        )
    }

    return (
        <div className="allies">
            <AddNewAlly callback={handleAddAlly}/>
            {allies.map((ally) => {
                return <Ally key={ally.gangIdentifier} gangIdentifier = {ally.gangIdentifier} type={ally.type} name = {ally.name} handleAccept={acceptAlly} handleDeny={denyAlly} handleCancel={cancelRequest} handleRemove = {removeAlly}/>
            })}
                
        </div>
    );
}