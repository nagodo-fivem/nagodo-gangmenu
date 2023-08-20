import React, { useState, useEffect, useRef } from 'react'
import { Account } from './account'

import '../../../css/bankingpage.css'
import { _T } from '../../../utils/translation';
import { fetchNui } from '../../../utils/fetchNui';
import { ActionMenu } from './action-menu';
import { Action } from './action';
import { AddNewAccount, AddNewAccountMenu } from './add-new-account';


function LoadingAccounts() {
    return (
        <div className="loading">
            <p>{_T('loading')}</p>
        </div>
    )
}


interface BankingPermissions {
    deposit: boolean;
    withdraw: boolean;
    view: boolean;
}

export function BankingPage() {
    const [accounts, setAccounts] = useState<any[]>([])
    const [permissions, setPermissions] = useState<BankingPermissions>({deposit: true, withdraw: true, view: false})
    const [actionMenu, setActionMenu] = useState<boolean>(false)
    const [actionType, setActionType] = useState<string>('')
    const [addingNewAccount, setAddingNewAccount] = useState<boolean>(false)
    const [newAccountName, setNewAccountName] = useState<string>('')
    const [currentValue, setCurrentValue] = useState<number>(0)

    let _selectedAccount = useRef<number>();


    async function fetchAccounts() {
        fetchNui('fetchAccounts', {}).then(
            (response) => {
                setAccounts(response);

                fetchPermissions(["deposit_money", "withdraw_money", "view_money"]);

            }
        );

    }

    async function fetchPermissions(_permissions: string[]) {
        fetchNui('fetchPermissions', {permissions: _permissions}).then(
            (response) => {
                let _permissions = {...permissions};
  
                _permissions.deposit = response[0];
            
                _permissions.withdraw = response[1];
            
                _permissions.view = response[2];
                
                setPermissions(_permissions);
            }
        );
    }

    useEffect(() => {
        fetchAccounts();
    }, [])

    function changeAccount(id: number) {
        _selectedAccount.current = id;
    }

    function handleAddNewAccount() {
        setAddingNewAccount(true);
    }

    function handleAddNewAccountAccept() {
        fetchNui('addNewAccount', {account_name: newAccountName}).then(
            (response) => {

                fetchAccounts();
                
            }
        );
        setAddingNewAccount(false);
    }

    function handleAddNewAccountCancel() {
        setAddingNewAccount(false);
    }

    function handleActionClick(type: string) {
        setActionType(type);
        setActionMenu(true);
    }

    function handleActionAccept() {
       
        fetchNui('bankAction', {type: actionType, value: currentValue, account: _selectedAccount.current}).then(    
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

    function handleValueChange(value: number) {
        setCurrentValue(value);
    }

    if (accounts === undefined || accounts === null || accounts.length === 0) {
        return (
            <div className="banking">
                <LoadingAccounts />
            </div>
        )
    }

    if (addingNewAccount) {
        return (
            <div className='banking'>
                
                <AddNewAccountMenu handleAccept={handleAddNewAccountAccept} handleCancel={handleAddNewAccountCancel} handleInputChange = {setNewAccountName} />
            </div>
        )
    }

    if (actionMenu) {
        return (
            <div className="banking">
                <ActionMenu type = {actionType} handleCancel={handleActionCancel} handleAccept={handleActionAccept} changeValue={handleValueChange} changeAccount={changeAccount}/>
            </div>
        )
    }

    return (
        <div className="banking">
           
            <div className='wrapper'>
                <div className="accounts">

                    <AddNewAccount handleAddNewAccount={handleAddNewAccount} />

                    {accounts.map((account) => {
                        return <Account key={account.id} name = {account.name} money={account.money} view = {permissions.view}/>
                    })}
                </div>
                <div className='actions'>
                    <Action text = {_T('deposit_money')} type = "deposit" hasPermission = {permissions.deposit} handleClick={handleActionClick}/>
                    <Action text = {_T('withdraw_money')} type = "withdraw" hasPermission = {permissions.withdraw} handleClick={handleActionClick}/>
                </div>
            </div>
            
        </div>
    );
}