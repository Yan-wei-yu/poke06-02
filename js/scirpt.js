import Deck from './deck.js'
const CARD_VALUE_MAP={
    "2":2,
    "3":3,
    "4":4,
    "5":5,
    "6":6,
    "7":7,
    "8":8,
    "9":9,
    "10":10,
    "J":11,
    "Q":12,
    "K":13,
    "A":14,

}
const computerCardSlot = document.querySelector('.computer-card-slot')
const playerCardSlot = document.querySelector('.player-card-slot')
const playererDeckElement = document.querySelector('.player-deck')
const computerDeckElement = document.querySelector('.computer-deck')
const text = document.querySelector('.text')


/*global*/ 
let computerDeck,playerDeck,inRound,stop

document.addEventListener('click',()=> {
    if(stop){
        startGame()
        return
    }
    if(inRound){
        cleanBeforeRound()
    }else{
        flipCards()
    }
})
/*改playerDeck 的deckMidpoint可改變玩家張數*/
startGame()
function startGame() {
    const deck = new Deck()
    deck.shuffle()

    const deckMidpoint= Math.ceil(deck.numberOfCards / 2)
    playerDeck= new Deck(deck.cards.slice(0,deckMidpoint))
    computerDeck=new Deck(deck.cards.slice(deckMidpoint,deck.numberOfCards))
    inRound = false
    stop = false
    cleanBeforeRound()
}

function cleanBeforeRound() {
    inRound = false
    computerCardSlot.innerHTML =''
    playerCardSlot.innerHTML=''
    text.innerText = ''
    updateDeckCount()
}
/*pop移除最後一個元素 
appendChild添加最後一個子節點*/
function flipCards() {
    inRound = true
    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()

    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())
    updateDeckCount()

    if (isRoundWinner(playerCard,computerCard)){
        text.innerText="Win"
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
        document.getElementById('W').play()
    }else if (isRoundWinner(computerCard,playerCard)){
        text.innerText="Lose"
        computerDeck.push(playerCard)
        computerDeck.push(computerCard)
        document.getElementById('L').play()
    }else{
        text.innerText="Draw"
        playerCard.push(playerCard)
        computerDeck.push(computerCard)

    }

    if(isGameOver(playerDeck)){
        text.innerText="You lose"
        stop =  true
    }else if (isGameOver(computerDeck)){
        text.innerText="You win"
        stop =  true
    }

}
function   updateDeckCount() {
    computerDeckElement.innerText= computerDeck.numberOfCards
    playererDeckElement.innerText= playerDeck.numberOfCards
    
}
function isRoundWinner(cardOne,cardTwo) {
    return CARD_VALUE_MAP[cardOne.value]>CARD_VALUE_MAP[cardTwo.value]
}
function isGameOver(deck) {
    return deck.numberOfCards === 0
    
}