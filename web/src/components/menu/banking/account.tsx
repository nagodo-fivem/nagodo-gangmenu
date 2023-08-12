import { _T } from "../../../utils/translation";

interface AccountProps {
    name: string;
    money: number;
}

export function Account(props: AccountProps) {

    function formatMoney(amount: number) {
        let amountString = _T('valuta');
        let formattedAmount = amount.toLocaleString();
        
        let finalAmount = amountString.replace('%s', formattedAmount);
        return finalAmount;
    }

    return (
        <div className="account">
            <p className='info name'>{props.name}</p>
            <p className="info money">{formatMoney(props.money)}</p>
        </div>
    )
}