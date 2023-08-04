interface MemberProps {
    name: string;
    rank: string;

    startEditing: Function;
}

export function Member(props: MemberProps) {

    function EditMember() {
        props.startEditing();
    }

    return (
        <div className="member">
            <p className='info name'>John Olsen</p>
            <p className='info rank'>Præsident</p>

            <div className='edit-btn' onClick={() => {EditMember()}}>
                <i className="fas fa-solid fa-edit"></i>
            </div>
        </div>
    )
}