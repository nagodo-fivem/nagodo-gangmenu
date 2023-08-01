import React, {useState} from 'react';
import '../css/App.css';
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";

import { GangMenu } from './menu/gangmenu';


const App: React.FC = () => {
    const [show, setShow] = useState(true);
    
    //NUI Hooks
    useNuiEvent<any>('open', (data) => {
        setShow(true);
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
            <GangMenu />
        </div>
    );
  
}

export default App;

