/*
花色、值
*/
const SUITS =["♠", "♣", "♥", "♦"]
const VALUE=[
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
]
/*
52張牌需分一半，export default只限一個
*/
export default class Deck{
    constructor(cards = freshDeck()){
        this.cards= cards
    }
    get numberOfCards() {
        return this.cards.length
    }
    /*移除第一個陣列*/
    pop(){
        return this.cards.shift()
    }
    push(card){
        this.cards.push(card)
    }
    //如果使用this.card.sort(a,b)=>math.random()-0.5有很大機率出現在相同卡槽、無法100確認會隨機，所以使用for迴圈//
    //拿走目前的卡片//
    shuffle(){
        for(let i= this.numberOfCards -1; i > 0 ;i--){
            const newIndex = Math.floor(Math.random()* (i+1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue

        }
    }
}
/*
需要得到52張牌的花色和值
若為梅花或黑桃則黑色，其他則紅色
*/
class Card {
    constructor(suit, value) {
      this.suit = suit
      this.value = value
    }
  
    get color() {
      return this.suit === "♣" || this.suit === "♠" ? "black" : "red"
    }
  
    getHTML() {
      const cardDiv = document.createElement("div")
      cardDiv.innerText = this.suit
      cardDiv.classList.add("card", this.color)
      cardDiv.dataset.value = `${this.value} ${this.suit}`
      return cardDiv
    }
  }

//花色與值的組合，flatmap映射每個元素，壓縮新組合//
//但需要濃縮成sigle array//
//如果SUIT用map將變成4組13個，但我們需要獨立的52張//
function freshDeck(){
    return SUITS.flatMap(suit=>{
        return VALUE.map(value=>{
            return new Card(suit,value)
        })

    })
}