import React, {useState} from 'react';
import { useNuiEvent } from "../hooks/useNuiEvent";
import '../css/bets.css';

function PlaceBetBtn(props: any) {
    if (!props.show) return null;
    return (
        <div className="placebetbtn">
            <p className='title'>Place bet</p>
        </div>
    )
}

interface BetProps {
    name: string;
    amount: number;
    isWinner?: boolean;
}

function Bet(props: BetProps) {

    let _className = 'bet';
    if (props.isWinner) _className = 'bet green';
    if (props.isWinner === false) _className = 'bet red';

    return (
        <div className={_className}>
            <p className='name'><i className='fa-solid fa-user'></i>John Henrik Olsen</p>
            <p className='amount'><i className="fa-solid fa-coins"></i>52000</p>
        </div>
    )
}

interface Bet {
    name: string;
    amount: number;
    isWinner?: boolean;
}

interface BetsProps {
    fightIsCreated: boolean;
}

export function Bets(props: BetsProps) {
    const [bets, setBets] = useState<Bet[]>([]);

    useNuiEvent<any>('setBets', (data) => {
        setBets(data);
    });

    return (
        <div className="bets">
            <PlaceBetBtn show = {props.fightIsCreated} />
            {bets.map((bet, index) => {
                    return <Bet key={index} name={bet.name} amount={bet.amount} isWinner={bet.isWinner} />
                }
            )}
        </div>
    );
}