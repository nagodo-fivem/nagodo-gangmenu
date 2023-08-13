import React, { useState, useEffect } from 'react';
import { fetchNui } from '../../../utils/fetchNui';

interface OptionProps {
    identifier: string;
    name: string;
    onClick: Function;
}

function Option(props: OptionProps) {
    return (
        <div className='option' onClick={() => {props.onClick(props.identifier)}}>
            <p className='name'>{props.name}</p>
        </div>
    )
}


interface IOption {
    identifier: string;
    name: string;
}

interface AllySelectorProps {
    updateNewAllyIdentifier: Function;
}

export function AllySelector(props: AllySelectorProps) {
    const [options, setOptions] = useState<IOption[]>([{identifier: "oki", name: "OKI"},{identifier: "din mor1", name: "Dinmor 1"},{identifier: "din mor2", name: "Dinmor 2"}]);
    const [open, setOpen] = useState(false);
    const [selectedGangIdentifier, setSelectedGangIdentifier] = useState<string>("Ikke valgt");


    function handleSelectorClick() {
        setOpen(!open);
    }

    function handleOptionClick(identifier: string) {
        setSelectedGangIdentifier(identifier);
        setOpen(false);
        props.updateNewAllyIdentifier(identifier);
    }

    function getGangName(identifier: string) {
            
        if (options === undefined || options === null) {
            return 'error';
        }

        if (selectedGangIdentifier === "Ikke valgt") {
            return "Ikke valgt"
        }

        let option = options.find((option) => {
            return option.identifier == identifier;
        })

        if (option === undefined) {
            return 'error';
        }

        return option.name;
    }

    function Header(h_props: {open: boolean}) {
        let arrow = h_props.open ? "fa-solid fa-chevron-up": "fa-solid fa-chevron-down";
        return (
            <div className='header' onClick={() => {handleSelectorClick()}}>
                <p className='selected-rank'>{getGangName(selectedGangIdentifier)}</p>
                <div className='arrow'>
                   <i className = {arrow}></i>
                </div>
            </div>
        )
    }

    async function fetchOptions() {
        fetchNui<any>('fetchAllySelectorOptions').then(
            (response) => {
                let options = response;
                
                setOptions(options);
            }
        );
    }

    useEffect(() => {
        fetchOptions();
    }, [])

    if (options === undefined || options === null || options.length === 0) {
        return (
            <div className="selector">

            </div>
        )
    }

    if (open) {
        return (
            <div className="selector">
                <Header open = {open} />
                <div className='options'>
                    {options.map((option) => {
                        return (
                            <Option identifier = {option.identifier} name={option.name} onClick = {handleOptionClick} />
                        )
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="selector">
            <Header open = {open} />
        </div>
    )
}