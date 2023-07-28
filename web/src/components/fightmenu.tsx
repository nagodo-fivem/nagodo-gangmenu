import React, {useState} from 'react';
import { useNuiEvent } from "../hooks/useNuiEvent";
import { SelectMenu } from './selectmenu';
import { Bets } from './bets';

import '../css/fightmenu.css';

interface FightMenuProps {
    fightIsCreated: boolean;
    fightIsStarted: boolean;
}

export function FightMenu(props: FightMenuProps): JSX.Element {
    
    return (
        <div className="fightmenu">
            <SelectMenu createFightBtn = {!props.fightIsCreated} startFightBtn = {props.fightIsStarted} />
            <Bets fightIsCreated = {props.fightIsCreated} />
        </div>
    );
}
