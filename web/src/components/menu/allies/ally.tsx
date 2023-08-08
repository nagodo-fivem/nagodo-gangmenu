
interface AllyBtnsProps {
    type: number
}

interface ButtonProps {
    text: string;
    color: string;
}

function AllyBtns(props: AllyBtnsProps) {

    function Button(props: ButtonProps) {
        let classname = "button " + props.color
        return (
            <div className={classname}>
                <p className="text">{props.text}</p>
            </div>
        )
    }
    
    if (props.type === 1) {
        return (
            <div className="buttons">
                <Button text = "Deny" color = "red" />
                <Button text = "Accept" color = "green" />
            </div>
        )
    } else if (props.type === 2) {
        return (
            <div className="buttons">
                <Button text = "Cancel" color = "red" />
            </div>
        )
    } else if (props.type === 3) {
        return (
            <div className="buttons">
                <Button text = "Remove" color = "red" />
            </div>
        )
    }

    return null;
}

interface AllyProps {
    type: number
}

export function Ally(props: AllyProps) {

    return (
        <div className="ally">
            <p className='info name'>Din mor</p>
            <p className="info extra">Pending</p>
            <AllyBtns type = {props.type} />
        </div>
    )
}