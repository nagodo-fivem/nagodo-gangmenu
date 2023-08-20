
interface ActionProps {
    text: string;
    type: string;
    hasPermission: boolean;
    handleClick: Function;
}

export function Action(props: ActionProps) {
    
    if (!props.hasPermission) {
        return (
            <div className="action not-pressable">
                <p className='text'>{props.text}</p>
            </div>
        )
    };

    return (
        <div className = 'action pressable' onClick={() => {props.handleClick(props.type)}}>
            <p className='text'>{props.text}</p>
        </div>
    )
}