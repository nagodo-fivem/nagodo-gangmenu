interface MemberProps {
    member_id: string;
    name: string;
    rank: string;

    startEditing: Function;
}

export function Member(props: MemberProps) {

    function editMember() {
        props.startEditing(props.member_id);
    }

    return (
        <div className="member">
            <p className='info name'>{props.name}</p>
            <p className='info rank'>{props.rank}</p>

            <div className='edit-btn' onClick={() => {editMember()}}>
                <i className="fas fa-solid fa-edit"></i>
            </div>
        </div>
    )
}