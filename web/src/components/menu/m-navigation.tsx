import React, { MouseEventHandler } from 'react';
import '../../css/navigation.css'

interface NavigationItemProps {
    name: string;
    icon: string;
    setCurrentPage: Function;
}

function NavigationItem(props: NavigationItemProps) {
    
    function handleClick(name: string){
        props.setCurrentPage(name);
    }
    
    return (
        <div className='nav-item' onClick = {() => {handleClick(props.name)}}>
            <i className= {"icon " + props.icon}></i>
        </div>
    )
}

interface NavigationProps {
    setCurrentPage: Function;
}

export function Navigation(props: NavigationProps) {

    return (
        <div className="navigation">
            <NavigationItem name = "members" icon = "fa-solid fa-people-group" setCurrentPage={props.setCurrentPage} />
            <NavigationItem name = "roles" icon = "fa-brands fa-windows" setCurrentPage={props.setCurrentPage}/>
            <NavigationItem name = "allies" icon = "fa-brands fa-windows" setCurrentPage={props.setCurrentPage}/>
            <NavigationItem name = "banking" icon = "fa-solid fa-coins" setCurrentPage={props.setCurrentPage}/>
        </div>
    );
}