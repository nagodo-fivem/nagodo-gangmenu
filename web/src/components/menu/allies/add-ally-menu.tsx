import React, { useRef, useState } from "react";
import { AllySelector } from "./ally-selector";

interface NewAllyData {
    gangIdentifier: string;
}

export function AddAllyMenu() {
    let _allyData = useRef<NewAllyData>();

    function updateNewAllyIdentifier(identifier: string)
    {
        if (_allyData.current !== undefined) {
            _allyData.current.gangIdentifier = identifier;
        }    
    }

    return (
        <div className="addallymenu">
            <div className="ally-selector">
                <AllySelector updateNewAllyIdentifier = {updateNewAllyIdentifier} />
            </div>

        </div>
    )
}