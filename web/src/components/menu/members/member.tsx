interface MemberProps {
    member_id: string;
    name: string;
    rank: string;
    permission: boolean;
    startEditing: Function;
}

export function Member(props: MemberProps) {

    function editMember() {
        props.startEditing(props.member_id);
    }

    let editBtn = (
        <div className='edit-btn'>
            <i className="fas fa-solid fa-edit not-pressable"></i>
        </div>
    );

    if (props.permission) {
        editBtn = (
            <div className='edit-btn' onClick={() => {editMember()}}>
                <i className="fas fa-solid fa-edit"></i>
            </div>
        ) 
    }

    return (
        <div className="member">
            <p className='info name'>{props.name}</p>
            <p className='info rank'>{props.rank}</p>

            {editBtn}
        </div>
    )
}