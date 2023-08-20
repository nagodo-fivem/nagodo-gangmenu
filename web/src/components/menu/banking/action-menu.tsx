import { _T } from "../../../utils/translation";
import { AccountSelector } from "./account-selector";


interface ActionMenuProps {
    type: string;
    handleAccept: Function;
    handleCancel: Function;
    changeValue: Function;
    changeAccount: Function;
}

function getActionTitle(type: string) {
    if (type === 'deposit') {
        return _T('deposit_money');
    }
    else if (type === 'withdraw') {
        return _T('withdraw_money');
    }
}

export function ActionMenu(props: ActionMenuProps) {

    function handleChange(event: any) {
        let value = event.target.value;

        props.changeValue(parseInt(value));
    }

    function handleAccountChange(id: number) {
        props.changeAccount(id);
    }

    return (
        <div className="action-menu">
            <div className='action-title'>
                <p className='title'>{getActionTitle(props.type)}</p>
            </div>

            <div className="selector">
                <AccountSelector handleAccountChange = {handleAccountChange}/>
            </div>

            <div className='input-field'>
                <p className='title'>{_T('amount')}</p>
                <input type="number" className="amount-input" onChange={handleChange} />
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
    )
}