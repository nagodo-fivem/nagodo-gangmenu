import { useEffect, useState } from "react";
import { _T } from "../../../utils/translation";
import { fetchNui } from "../../../utils/fetchNui";

interface AddNewAccountMenuProps {
    handleAccept: Function;
    handleCancel: Function;
    handleInputChange: Function;
}

export function AddNewAccountMenu(props: AddNewAccountMenuProps) {

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        props.handleInputChange(event.target.value);
    }

    return (
        <div className="add-account-menu">
            <div className="input-field">
                <p className='title'>{_T('account_name')}</p>
                <input type="text" className="name-input" onChange={handleChange} />
            </div>

            <div className = "main-btns">

                <div className="cancel btn" onClick={() => {props.handleCancel()}}>
                    <p className="text">{_T('cancel')}</p>
                </div>

                <div className="save btn" onClick={() => {props.handleAccept()}}>
                    <p className="text">{_T('accept')}</p>
                </div>
                
            </div>
        </div>
    );
}

interface AddNewAccountProps {
    handleAddNewAccount: Function;
}

export function AddNewAccount(props: AddNewAccountProps) {
    const [hasPermission, setHasPermission] = useState<boolean>(false);

    async function fetchPermission() {
        fetchNui('fetchPermission', {permission_name: "add_account"}).then(
            (response) => {
                setHasPermission(response);
            }
        );
    }

    useEffect(() => {
        setHasPermission(true);
        fetchPermission();
    }, [])

    if (!hasPermission) {
        return (
            <div className="add-new-account not-pressable">
                <p className='text'>{_T('add_new_account')}</p>
            </div>
        )
    }

    return (
        <div className='add-new-account' onClick={() => {props.handleAddNewAccount()}}>
            <p>{_T('add_new_account')}</p>
        </div>
    )
}