import { _T } from "../../../utils/translation";

interface RoleProps {
    id: number;
    name: string;
    playerAmount: number;
    editable: boolean;
    startEditing: Function;
}

export function Role(props: RoleProps) {

    function editRole() {
        props.startEditing(props.id);
    }

    let editBtn = (
        <div className='edit-btn'>
            <i className="fas fa-solid fa-edit not-pressable"></i>
        </div>
    );

    if (props.editable) {
        editBtn = (
            <div className='edit-btn' onClick={() => {editRole()}}>
                <i className="fas fa-solid fa-edit"></i>
            </div>
        ) 
    }

    return (
        <div className="role">
            <p className='info name'>{props.name}</p>
            <p className='info extra'>{_T('members') + props.playerAmount}</p>

            {editBtn}
            
        </div>
    )
}