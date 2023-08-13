import React, { useRef, useState } from "react";
import { AllySelector } from "./ally-selector";

interface NewAllyData {
    gangIdentifier: string;
}

interface AddAllyMenuProps {
    stopAddingAlly: Function;
    addAlly: Function;
}

export function AddAllyMenu(props: AddAllyMenuProps) {
    let _allyData = useRef<NewAllyData>({gangIdentifier: ""});

    function updateNewAllyIdentifier(identifier: string)
    {
        if (_allyData.current !== undefined) {
            _allyData.current.gangIdentifier = identifier;
        }    
    }

    function handleSendClick(identifier: string) {
        if (_allyData.current !== undefined) {
            props.addAlly(identifier);
        }
    }

    return (
        <div className="addallymenu">
            <div className="ally-selector">
                <AllySelector updateNewAllyIdentifier = {updateNewAllyIdentifier} />
            </div>

            <div className = "main-btns">

                <div className="cancel btn" onClick={() => {props.stopAddingAlly()}}>
                    <p className="text">Cancel</p>
                </div>

                <div className="send btn" onClick={() => {handleSendClick(_allyData.current.gangIdentifier)}}>
                    <p className="text">Send request</p>
                </div>
                
            </div>
        </div>
    )
}