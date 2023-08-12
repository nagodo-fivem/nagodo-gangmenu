import React, { useState, useEffect } from 'react'
import { Account } from './account'

import '../../../css/bankingpage.css'
import { _T } from '../../../utils/translation';


function LoadingAccounts() {
    return (
        <div className="loading">
            <p>{_T('loading')}</p>
        </div>
    )
}

interface ActionProps {
    text: string;
    hasPermission: boolean;
}

function Action(props: ActionProps) {
    let className = 'action'

    if (!props.hasPermission) return null;

    if (props.hasPermission) {
        className = 'action pressable'
    } 
    return (
        <div className={className}>
            <p className='text'>{props.text}</p>
        </div>
    )
}

export function BankingPage() {
    const [accounts, setAccounts] = useState<any[]>([{name: "Din mor", money: 10000},{name: "Din mor", money: 250000},{name: "Din mor", money: 10000},{name: "Din mor", money: 99999999999}])
    
    if (accounts === undefined || accounts === null || accounts.length === 0) {
        return (
            <div className="banking">
                <LoadingAccounts />
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
                <Action text = 'Deposit' hasPermission = {true} />
                <Action text = 'withdraw' hasPermission = {false} />
                <Action text = 'Transfer' hasPermission = {true} />
            </div>
        </div>
    );
}