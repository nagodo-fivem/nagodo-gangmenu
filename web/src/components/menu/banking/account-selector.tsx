import { useEffect, useState } from "react";
import { fetchNui } from "../../../utils/fetchNui";

interface OptionComponentProps {
    id: number;
    name: string;
    onClick: Function;
}

function OptionComponent(props: OptionComponentProps) {
    return (
        <div className='option' onClick={() => {props.onClick(props.id)}}>
            <p className='name'>{props.name}</p>
        </div>
    )
}

interface AcccountSelectorProps {
    handleAccountChange: Function;
}

interface SelectorOption {
    id: number;
    name: string;
    
}

export function AccountSelector(props: AcccountSelectorProps) {
    const [selectedAccountId, setSelectedAccountId] = useState<number>(1);
    const [options, setOptions] = useState<SelectorOption[]>([]);

    const [open, setOpen] = useState(false);

    function handleSelectorClick() {
        setOpen(!open);
    }

    function handleOptionClick(id: number) {
        
        setOpen(false);
        props.handleAccountChange(id);
        setSelectedAccountId(id);
    }

    function getSelectedAccountName(id: number) {

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
                <p className='selected-rank'>{getSelectedAccountName(selectedAccountId)}</p>
                <div className='arrow'>
                   <i className = {arrow}></i>
                </div>
                
            </div>
        )
    }

    async function fetchOptions() {
        fetchNui<any>('fetchAccountSeletorOptions').then(
            (response) => {
                let options = response;
       
                options.sort((a: SelectorOption, b: SelectorOption) => {
                    if (a.name < b.name) {
                        return -1;
                    }  
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                })

                setOptions(options);
                setSelectedAccountId(options[0].id);
                props.handleAccountChange(options[0].id);
            }
        );
    }

    useEffect(() => {
        fetchOptions();
    }, [])

    if (options === undefined || options === null || options.length === 0) {
        return (
            <div className="account-selector">

            </div>
        )
    }

    if (open) {
        return (
            <div className="account-selector">
                <Header open = {open} />
                <div className='options'>
                    {options.map((option) => {
                        return (
                            <OptionComponent id= {option.id} name={option.name} onClick = {handleOptionClick} />
                        )
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="account-selector">
            <Header open = {open} />
        </div>
    )
}