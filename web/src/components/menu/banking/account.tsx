import { _T } from "../../../utils/translation";

interface AccountProps {
    name: string;
    money: number;
    view: boolean;
}

export function Account(props: AccountProps) {

    function formatMoney(amount: number) {

        if (!props.view) {
            return _T('hiddenMoney');
        }

        let amountString = _T('valuta');
        let formattedAmount = amount.toLocaleString();
        
        let finalAmount = amountString.replace('[money]', formattedAmount);
        return finalAmount;
    }

    return (
        <div className="account">
            <p className='info name'>{props.name}</p>
            <p className="info money">{formatMoney(props.money)}</p>
        </div>
    )
}