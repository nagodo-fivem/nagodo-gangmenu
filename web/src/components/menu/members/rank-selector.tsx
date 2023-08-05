import React, { useState, useEffect } from 'react';

interface OptionProps {
    id: number;
    name: string;
    onClick: Function;
}

function Option(props: OptionProps) {
    return (
        <div className='option' onClick={() => {props.onClick(props.id)}}>
            <p className='name'>{props.name}</p>
        </div>
    )
}

interface IOption {
    id: number;
    name: string;
}

export function RankSelector() {
    const [selectedRank, setSelectedRank] = useState('Præsident');
    const [options, setOptions] = useState<IOption[]>([{id: 1, name: 'Præsident'}, {id: 2, name: 'Vicepræsident'}, {id: 3, name: 'Sekretær'}, {id: 4, name: 'Kasserer'}, {id: 5, name: 'Medlem'}, {id: 6, name: 'Prospect'}, {id: 7, name: 'Supporter'}]);
    const [open, setOpen] = useState(false);

    function handleSelectorClick() {
        setOpen(!open);
    }

    function handleOptionClick(id: number) {
        let option = options.find((option) => {
            return option.id === id;
        })

        if (option !== undefined) {
            setOpen(false);
            setSelectedRank(option.name);
        }
    }

    async function fetchOptions() {

    }

    function Header(props: {open: boolean}) {
        let arrow = props.open ? "fa-solid fa-chevron-up": "fa-solid fa-chevron-down";
        return (
            <div className='header' onClick={() => {handleSelectorClick()}}>
                <p className='selected-rank'>{selectedRank}</p>
                <div className='arrow'>
                   <i className = {arrow}></i>
                </div>
            </div>
        )
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
                            <Option id= {option.id} name={option.name} onClick = {handleOptionClick} />
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