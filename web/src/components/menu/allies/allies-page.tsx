import React, { useState, useEffect } from 'react'
import { Ally } from './ally'
import '../../../css/alliespage.css'


function LoadingAllies() {
    return (
        <div className="loading">
            <p>Loading...</p>
        </div>
    )
}

interface IAlly {
    id: number;
    type: number;
}

function AddNewAlly() {
    return (
        <div className="newally">
            <p className='info name'>Add new ally</p>
        </div>
    )
}

export function AlliesPage() {
    const [allies, setAllies] = useState<IAlly[]>([{id: 1, type: 1},{id: 1, type: 1},{id: 1, type: 2},{id: 1, type: 3},{id: 1, type: 1}])

    if (allies === undefined || allies === null || allies.length === 0) {
        return (
            <div className="allies">
                <LoadingAllies />
            </div>
        )
    }

    return (
        <div className="allies">
            <AddNewAlly />
            {allies.map((ally) => {
                return <Ally key={ally.id} type={ally.type} />
            })}
                
        </div>
    );
}