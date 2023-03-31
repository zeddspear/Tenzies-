import React from 'react'
import Die from './Components/Die'
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import './App.css'


function App() {
  
  const [newDices,setNewDices] = React.useState(allNewDice());

  const [tenzies,setTenzies] = React.useState(false);

  const [rollsCount,setRollsCount] = React.useState(0);

  const {width,height} = useWindowSize();



  React.useEffect(()=>{
    
    const isAllHeld = newDices.every(die => die.isHeld === true);
    const firstValue = newDices[0].value;
    const isAllSame = newDices.every(die => die.value === firstValue);

    if(isAllHeld && isAllSame){
      setTenzies(true);
    }

  },[newDices])

  

  // returns a random number between 1 to 6
  function returnRandom(){
    return Math.ceil(Math.random() * 6)
  }

  // returns random dice object
  function randomDice(){
    return {
      id: nanoid(),
      value: returnRandom(),
      isHeld: false
    }
  }

  // populates arrays with dice object and return that array
  function allNewDice(){
      const newArray = [];
      for(let i=0;i<10;i++){
        newArray.push(randomDice());
      }
      return newArray;
  }

  // changing die hold option on clicking
  function holdDice(diceID){
    setNewDices(Dices => Dices.map(Dice => {
      return Dice.id === diceID ? {...Dice,
                                   isHeld: !Dice.isHeld
                                  } 
                                  : Dice
    }))
  }

  function rollDice(){
    setNewDices(Dices => Dices.map(Dice =>{
      return Dice.isHeld ? Dice : randomDice();
    }))
    setRollsCount(rollsCount+1);
  }

  function resetGame(){
    setNewDices(allNewDice);
    setTenzies(false);
    setRollsCount(0);
  }

  const Dices = newDices.map((dice)=>{
    return <Die 
                key={dice.id}
                value={dice.value}
                isHeld={dice.isHeld}
                onHold={()=> holdDice(dice.id)} 
            />
  })

  return (
    <div className="App">
    {tenzies && <Confetti
      width={width}
      height={height}
    />}
    <div className='Head'>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    </div>
    
    <div className='Die_Container'>
        {Dices}
    </div>
    <button className='btn' onClick={tenzies ? resetGame :rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    <span className='roll-count'>Rolls: {rollsCount}</span>
    </div>
  )
}

export default App
