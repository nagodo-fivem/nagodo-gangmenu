import React, { useState, useEffect } from 'react'
import { Account } from './account'

import '../../../css/bankingpage.css'


function LoadingAccounts() {
    return (
        <div className="loading">
            <p>Loading...</p>
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
    const [accounts, setAccounts] = useState<any[]>(["", "", "", "", "", "", ""])
    
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
                    return <Account key={account.id} />
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