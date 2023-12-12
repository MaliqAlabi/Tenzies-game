import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App() {
    const [dice,setDice] = React.useState(allNewDice())
    const [tenzies,setTenzies] = React.useState(false)
    
    
    React.useEffect(() => {
        const hold = dice.every(die => die.isHeld)
        const diceValue = dice[0].value
        const allValue = dice.every(die => diceValue === die.value)
        if (hold && allValue){
            setTenzies(true)
        }
    },[dice])
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid(),
            })
        }
        return newDice
        
    }
    
    function rollDice(){
        if (!tenzies){
            setDice(oldDice => oldDice.map(die => {
            return die.isHeld ?
                    die : {
                            value: Math.ceil(Math.random() * 6),
                            isHeld: false,
                            id: nanoid(),
                        }
        }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    
    function handleDice(id){
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                    {...die,isHeld: !die.isHeld} : die
        }))
    }
    
    const diceElements = dice.map(item => {
        return (<Die 
                    key={item.id}
                    value={item.value} 
                    isHeld={item.isHeld}
                    id={item.id}
                    handleDice={handleDice}/>)
    })
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className='roll-dice' onClick={rollDice}>{tenzies ? 'New Game': 'Roll'}</button>
        </main>
    )
}