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
    const [hasPermission, setHasPermission] = useState<boolean>(false);

    async function fetchPermission() {
        fetchNui<boolean>('fetchPermission', {permission_name: "manage_allies"}).then(
            (response) => {
                setHasPermission(response);
            }
        );
    } 

    useEffect(() => {
        setHasPermission(true);      
        fetchPermission();
    }, [])

    if (!hasPermission) return null;

    return (
        <div className="newally" onClick={() => {props.callback()}}>
            <p className='info name'>{_T('add_new_ally')}</p>
        </div>
    )
}

export function AlliesPage() {
    const [allies, setAllies] = useState<IAlly[]>([])
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [addingAlly, setAddingAlly] = useState<boolean>(false);
    const [hasPermission, setHasPermission] = useState<boolean>(false);

    async function fetchPermission() {
        fetchNui<boolean>('fetchPermission', {permission_name: "manage_allies"}).then(
            (response) => {
                setHasPermission(response);
            }
        );
    } 

    async function fetchAllies() {
        fetchNui<any>('fetchAllies').then(
            (response) => {
                let allies: IAlly[] = [];

                for (let i = 0; i < response.length; i++) {
                    let ally = response[i];
                    let _ally = {
                        gangIdentifier: ally.identifier,
                        name: ally.name,
                        type: 0
                    }

                    if (ally.accepted) {
                        _ally.type = 3;
                    } 
                    else if (!ally.sender && !ally.accepted) {
                        _ally.type = 1;
                    }
                    else if (ally.sender && !ally.accepted) {
                        _ally.type = 2;
                    } 

                    allies.push(_ally);
                }

                setAllies(allies);
                setIsLoaded(true);

                fetchPermission();
            }
        );
    }

    useEffect(() => {
        setHasPermission(false);
        fetchAllies();
    }, [])

    function sendAllyRequest(gangIdentifier: string) {

        fetchNui<any>('sendAllyRequest', {gangIdentifier}).then(
            (response) => {
                fetchAllies();
            }
        );

        setAddingAlly(false);
    }

    function handleAddAlly() {
        setAddingAlly(true);
    }

    function cancelAddAlly() {
        setAddingAlly(false);
    }

    function acceptAlly(gangIdentifier: string) {
        fetchNui<any>('acceptAllyRequest', {gangIdentifier}).then(
            (response) => {
                fetchAllies();
            }
        );
    }

    function denyAlly(gangIdentifier: string) {
        fetchNui<any>('denyAllyRequest', {gangIdentifier}).then(
            (response) => {
                fetchAllies();
            }
        );
    }

    function cancelRequest(gangIdentifier: string) {
        fetchNui<any>('cancelAllyRequest', {gangIdentifier}).then(
            (response) => {
                fetchAllies();
            }
        );
    }

    function removeAlly(gangIdentifier: string) {
        fetchNui<any>('removeAlly', {gangIdentifier}).then(
            (response) => {
                fetchAllies();
            }
        );
    }

    if (addingAlly) {
        return (
            <div className="allies">
                <AddAllyMenu stopAddingAlly={cancelAddAlly} addAlly={sendAllyRequest} />
            </div>
        )
    }


    if ((allies === undefined || allies === null || allies.length === 0) && !isLoaded) {
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
                return <Ally key={ally.gangIdentifier} hasPermission = {hasPermission} gangIdentifier = {ally.gangIdentifier} type={ally.type} name = {ally.name} handleAccept={acceptAlly} handleDeny={denyAlly} handleCancel={cancelRequest} handleRemove = {removeAlly}/>
            })}
                
        </div>
    );
}