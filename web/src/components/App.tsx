import React, {useState} from 'react';
import '../css/App.css';
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { FightMenu } from './fightmenu';

const App: React.FC = () => {
    const [show, setShow] = useState(false);
    const [fightIsCreated, setFightIsCreated] = useState<boolean>(false);
    const [fightIsStarted, setFightIsStarted] = useState<boolean>(false);
   
    //NUI Hooks
    useNuiEvent<any>('open', (data) => {
        setShow(true);
    });

    useNuiEvent<boolean>('setFightIsCreated', (state) => {
        setFightIsCreated(state);
    });

    useNuiEvent<boolean>('setFightIsStarted', (state) => {
        setFightIsStarted(state);
    });

    const keyHandler = (e: KeyboardEvent) => {
        if (["Escape"].includes(e.code)) { 
            EscapePressed();          
        }
    }

    function EscapePressed() {
        fetchNui<string>('close', {}).then(
            (response) => {
                setShow(false);
            }
        );

    }
    
    window.addEventListener("keydown", keyHandler)

    if (!show) return null;

    
    return (
        <div className="App">
            <FightMenu fightIsCreated = {fightIsCreated} fightIsStarted = {fightIsStarted}/>
        </div>
    );
  
}

export default App;

