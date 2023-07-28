import React, {useState} from 'react';
import { fetchNui } from '../utils/fetchNui';
import '../css/selectmenu.css';

interface HeaderBtnProps {
    interactable: boolean;
}

interface CreateFightBtnProps extends HeaderBtnProps {
    
}

function CreateFightBtn(props: CreateFightBtnProps) {
    const [alreadyCreatedText, setAlreadyCreatedText] = useState<string>('A fight has already been created');
    
    function handleClick() {
        fetchNui<string>('createFightPressed', {}).then(
            (response) => {
                console.log(response);
            }
        );
    }

    let _className = 'btn';

    if (!props.interactable) _className = 'btn not-interactable';

    let createFunction = () => {
        if (!props.interactable) return;

        handleClick();
    }

    return (
        <div className={_className} onClick={createFunction}>
            <p className='title'>Create</p>
            <p className='extra'>{alreadyCreatedText}</p>
        </div>
    );
}

interface StartFightBtnProps extends HeaderBtnProps {
    
}

function StartFightBtn(props: StartFightBtnProps) {
    const [automaticStartText, setAutomaticStartText] = useState<string>('The fight will automatically start in ...');

    function handleClick()
    {
        fetchNui<string>('startFightPressed', {}).then(
            (response) => {
                console.log(response);
            }
        );
    }

    let _className = 'btn';

    if (!props.interactable) _className = 'btn not-interactable';

    let startFunction = () => {
        if (!props.interactable) return;
        handleClick();
    }

    return (
        <div className={_className} onClick={startFunction}>
            <p className='title'>Start</p>
            <p className='extra'>{automaticStartText}</p>
        </div>
    );
}

interface SelectMenuProps {
    createFightBtn: boolean;
    startFightBtn: boolean;
}

export function SelectMenu(props: SelectMenuProps): JSX.Element {

    return (
        <div className="selectmenu">
            <CreateFightBtn interactable = {props.createFightBtn} />
            <StartFightBtn interactable = {props.startFightBtn} />
        </div>
    );
}