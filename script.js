const X_CLASS='x'
const CIRCE_CLASS='circle'
let aud= new Audio("Snappy.ogg")
const WINNING_COMBINATION=[
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]
]

const cellElements =document.querySelectorAll('[data-cell]')
const board=document.getElementById('board')
const winningMessageElement=document.getElementById('winningMessage')
const restartButton=document.getElementById('restartButton')
const restartButton2=document.getElementById('restartButton2')
const winningMessageTextElement=document.querySelector('[data-winning-message-text]')

let circleTurn

startGame()
restartButton.addEventListener('click',startGame)
restartButton2.addEventListener('click',startGame)

function startGame(){
	circleTurn=false
	
	cellElements.forEach(cell =>{
		cell.classList.remove(X_CLASS)
		cell.classList.remove(CIRCE_CLASS)
		cell.removeEventListener('click',handleClick) 
		cell.addEventListener('click',handleClick,{once:true})
	})
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
}

function handleClick(e){ 
    aud.play();
	const cell=e.target
	const currentClass=circleTurn ? CIRCE_CLASS:X_CLASS	
	placeMark(cell,currentClass)
	
	if(checkWin(currentClass)){
		endGame(false)
	}
	else if(isDraw()){
		endGame(true)
	}
	else{
		swapTurns()
		setBoardHoverClass()
	}
}

function endGame(draw){
	if(draw){
		winningMessageTextElement.innerText='Draw!!!'
	}
	else{
		winningMessageTextElement.innerText=`${circleTurn ? "Hurrah there !! Zero (0's) player":"Hurrah there !! cross(X's) player"} Wins`
	}
	winningMessageElement.classList.add('show')
}

function isDraw(){
	return [...cellElements].every(cell => {
		return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCE_CLASS)
	})
}

function placeMark(cell, currentClass){
	cell.classList.add(currentClass)
}

function swapTurns(){
	circleTurn =!circleTurn
}

function setBoardHoverClass(){
	board.classList.remove(X_CLASS)
	board.classList.remove(CIRCE_CLASS)
	if (circleTurn){
		board.classList.add(CIRCE_CLASS)
	}
	else{
		board.classList.add(X_CLASS)
	}
}

function checkWin(currentClass){
	return WINNING_COMBINATION.some(combination =>{
		return combination.every(index=>{
			return cellElements[index].classList.contains(currentClass)
		})
	})
}