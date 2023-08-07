import React, { useState, useEffect } from 'react';

interface NameChangerProps {
    currentName: string;
    setCurrentName: Function;
}

export function NameChanger(props: NameChangerProps) {
    
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        props.setCurrentName(event.target.value);
    }

    return (
        <div className="changer">
            <p className='title'>Change role name</p>
            <input type="text" className="name-input" onChange={handleChange} />
        </div>
    )
}