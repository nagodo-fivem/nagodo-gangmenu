import React, { useState, useEffect } from 'react';
import { fetchNui } from "../../../utils/fetchNui";

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

interface RankSelectorProps {
    updateMemberRank: Function;
    selectedRankId: number;
}

export function RankSelector(props: RankSelectorProps) {
    const [selectedRankId, setSelectedRankId] = useState<number>(props.selectedRankId);
    const [options, setOptions] = useState<IOption[]>([{id: 0, name: 'error'},{id: 0, name: 'error'},{id: 0, name: 'error'},{id: 0, name: 'error'},{id: 0, name: 'error'},{id: 0, name: 'error'}]);
    const [open, setOpen] = useState(false);

    function handleSelectorClick() {
        setOpen(!open);
    }

    function handleOptionClick(id: number) {
        props.updateMemberRank(id);
        setOpen(false);
        setSelectedRankId(id);
    }

    function getSelectedRankName(id: number) {

        if (options === undefined || options === null) {
            return 'error';
        }

        let option = options.find((option) => {
            return option.id == id;
        })

        if (option === undefined) {
            return 'error';
        }

        return option.name;
    }


    function Header(props: {open: boolean}) {
        let arrow = props.open ? "fa-solid fa-chevron-up": "fa-solid fa-chevron-down";
        return (
            <div className='header' onClick={() => {handleSelectorClick()}}>
                <p className='selected-rank'>{getSelectedRankName(selectedRankId)}</p>
                <div className='arrow'>
                   <i className = {arrow}></i>
                </div>
            </div>
        )
    }

    async function fetchOptions() {
        fetchNui<any>('fetchRankSeletorOptions').then(
            (response) => {
                let options = response;
    
                options.sort((a: IOption, b: IOption) => {
                    return b.id- a.id;
                })

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