interface RoleProps {
    id: number;
    name: string;

    startEditing: Function;
}

export function Role(props: RoleProps) {

    function EditRole() {
        props.startEditing();
    }

    return (
        <div className="role">
            <p className='info name'>{props.name}</p>
            <p className='info extra'>Members: 2</p>

            <div className='edit-btn' onClick={() => {EditRole()}}>
                <i className="fas fa-solid fa-edit"></i>
            </div>
        </div>
    )
}