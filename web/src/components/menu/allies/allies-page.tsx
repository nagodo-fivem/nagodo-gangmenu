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
}

export function AlliesPage() {
    const [allies, setAllies] = useState<IAlly[]>([{id: 1},{id: 1},{id: 1},{id: 1},{id: 1},{id: 1}])

    if (allies === undefined || allies === null || allies.length === 0) {
        return (
            <div className="allies">
                <LoadingAllies />
            </div>
        )
    }

    return (
        <div className="allies">
            <div className='section list'>
                <div className='title'>
                    <p>Allies</p>
                </div>
                
                <div className='wrapper'>
                    {allies.map((ally) => {
                        return <Ally key={ally.id} />
                    })}
                </div>
                
            </div>

            <div className='section pending'>

            </div>

            
        </div>
    );
}