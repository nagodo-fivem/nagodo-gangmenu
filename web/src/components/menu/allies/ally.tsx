import { _T } from "../../../utils/translation";

interface AllyBtnsProps {
    gangIdentifier: string;
    type: number
    handleAccept: Function;
    handleDeny: Function;
    handleCancel: Function;
    handleRemove: Function;
    hasPermission: boolean;
}

interface ButtonProps {
    text: string;
    color: string;
    callback: Function;
    
}

function AllyBtns(props: AllyBtnsProps) {

    if (!props.hasPermission) return null;

    function Button(_props: ButtonProps) {
        let classname = "button " + _props.color
        return (
            <div className={classname} onClick={() => {_props.callback(props.gangIdentifier)}}>
                <p className="text">{_props.text}</p>
            </div>
        )
    }
    
    if (props.type === 1) {
        return (
            <div className="buttons">
                <Button text = "Deny" color = "red" callback={props.handleDeny} />
                <Button text = "Accept" color = "green" callback={props.handleAccept} />
            </div>
        )
    } else if (props.type === 2) {
        return (
            <div className="buttons">
                <Button text = "Cancel" color = "red" callback={props.handleCancel} />
            </div>
        )
    } else if (props.type === 3) {
        return (
            <div className="buttons">
                <Button text = "Remove" color = "red" callback={props.handleRemove} />
            </div>
        )
    }

    return null;
}

interface AllyProps {
    gangIdentifier: string;
    hasPermission: boolean;
    type: number;
    name: string;
    handleAccept: Function;
    handleDeny: Function;
    handleCancel: Function;
    handleRemove: Function;
}

export function Ally(props: AllyProps) {
    let info = ""

    if (props.type === 1) {
        info = _T('ally_request')
    } else if (props.type === 2) {
        info = _T('ally_pending')
    } else if (props.type === 3) {
        info = _T('ally')
    }


    return (
        <div className="ally">
            <p className='info name'>{props.name}</p>
            <p className="info extra">{info}</p>
            <AllyBtns type = {props.type} hasPermission = {props.hasPermission} gangIdentifier = {props.gangIdentifier} handleAccept={props.handleAccept} handleCancel={props.handleCancel} handleDeny={props.handleDeny} handleRemove={props.handleRemove} />
        </div>
    )
}