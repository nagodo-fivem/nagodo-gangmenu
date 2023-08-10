import React, {useState} from 'react';
import '../css/App.css';
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";

import { GangMenu } from './menu/gangmenu';
import { setTranslations } from '../utils/translation';


const App: React.FC = () => {
    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState('members');
    
    //NUI Hooks
    useNuiEvent<boolean>('open', (data) => {
        setShow(true);
    });

    useNuiEvent<any>('setTranslations', (data: any) => {
        console.log("Translations received");
        setTranslations(data);
    });

    const keyHandler = (e: KeyboardEvent) => {
        if (["Escape"].includes(e.code)) { 
            escapePressed();          
        }
    }

    function escapePressed() {
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
            <GangMenu currentPage = {currentPage} setCurrentPage = {setCurrentPage}/>
        </div>
    );
  
}

export default App;

