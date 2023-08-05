interface RoleProps {
    id: number;
    name: string;
    playerAmount: number;

    startEditing: Function;
}

export function Role(props: RoleProps) {

    function editRole() {
        props.startEditing(props.id);
    }

    return (
        <div className="role">
            <p className='info name'>{props.name}</p>
            <p className='info extra'>Members: {props.playerAmount}</p>

            <div className='edit-btn' onClick={() => {editRole()}}>
                <i className="fas fa-solid fa-edit"></i>
            </div>
        </div>
    )
}