import React, { useState, useEffect } from 'react'
import { Account } from './account'

import '../../../css/bankingpage.css'
import { _T } from '../../../utils/translation';
import { fetchNui } from '../../../utils/fetchNui';


function LoadingAccounts() {
    return (
        <div className="loading">
            <p>{_T('loading')}</p>
        </div>
    )
}

interface ActionMenuProps {
    type: string;
    handleAccept: Function;
    handleCancel: Function;
}

function ActionMenu(props: ActionMenuProps) {

    let title = '';
    if (props.type === 'deposit') {
        title = _T('deposit_money');
    }
    else if (props.type === 'withdraw') {
        title = _T('withdraw_money');
    }
    else if (props.type === 'transfer') {
        title = _T('transfer_money');
    }

    return (
        <div className="action-menu">
            <div className='action-title'>
                <p className='title'>{title}</p>
            </div>
            <div className='input-field'>
                <p className='title'>{_T('amount')}</p>
                <input type="number" className="amount-input" />
            </div>

            <div className = "main-btns">

                <div className="cancel btn" onClick={() => {props.handleCancel()}}>
                    <p className="text">{_T('cancel')}</p>
                </div>

                <div className="save btn" onClick={() => {props.handleAccept()}}>
                    <p className="text">{_T('accept')}</p>
                </div>
                
            </div>
        </div> 
    )
}

interface ActionProps {
    text: string;
    type: string;
    hasPermission: boolean;
    handleClick: Function;
}

function Action(props: ActionProps) {
    
    if (!props.hasPermission) {
        return (
            <div className="action not-pressable">
                <p className='text'>{props.text}</p>
            </div>
        )
    };

    return (
        <div className = 'action pressable' onClick={() => {props.handleClick(props.type)}}>
            <p className='text'>{props.text}</p>
        </div>
    )
}

interface BankingPermissions {
    deposit: boolean;
    withdraw: boolean;
    transfer: boolean;
}

export function BankingPage() {
    const [accounts, setAccounts] = useState<any[]>([{name: "Din mor", money: 10000},{name: "Din mor", money: 250000},{name: "Din mor", money: 10000},{name: "Din mor", money: 99999999999}])
    const [permissions, setPermissions] = useState<BankingPermissions>({deposit: true, withdraw: true, transfer: true})
    const [actionMenu, setActionMenu] = useState<boolean>(false)
    const [actionType, setActionType] = useState<string>('')

    async function fetchAccounts() {
        fetchNui('fetchAccounts', {}).then(
            (response) => {
                setAccounts(response);

                fetchPermissions();
            }
        );

    }

    async function fetchPermissions() {
        fetchNui('fetchPermissions', {}).then(
            (response) => {
                setPermissions(response);
            }
        );
    }

    useEffect(() => {
        fetchAccounts();
    }, [])

    function handleActionClick(type: string) {
        setActionType(type);
        setActionMenu(true);
    }

    function handleActionAccept() {
        fetchNui('bankAction', {type: actionType}).then(    
            (response) => {
                if (response) {
                    fetchAccounts();
                }
            }
        );
        setActionMenu(false);
    }

    function handleActionCancel() {
        setActionType('');
        setActionMenu(false);
    }

    if (accounts === undefined || accounts === null || accounts.length === 0) {
        return (
            <div className="banking">
                <LoadingAccounts />
            </div>
        )
    }

    if (actionMenu) {
        return (
            <div className="banking">
                <ActionMenu type = {actionType} handleCancel={handleActionCancel} handleAccept={handleActionAccept} />
            </div>
        )
    }

    return (
        <div className="banking">
            <div className="accounts">
                {accounts.map((account) => {
                    return <Account key={account.id} name = {account.name} money={account.money} />
                })}
            </div>
            <div className='actions'>
                <Action text = {_T('deposit_money')} type = "deposit" hasPermission = {permissions.deposit} handleClick={handleActionClick}/>
                <Action text = {_T('withdraw_money')} type = "withdraw" hasPermission = {permissions.withdraw} handleClick={handleActionClick}/>
                <Action text = {_T('transfer_money')} type = "transfer" hasPermission = {permissions.transfer} handleClick={handleActionClick}/>
            </div>
        </div>
    );
}