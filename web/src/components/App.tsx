import React, {useState} from 'react';
import '../css/App.css';
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";


const App: React.FC = () => {
    const [show, setShow] = useState(false);
    
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
            
        </div>
    );
  
}

export default App;

