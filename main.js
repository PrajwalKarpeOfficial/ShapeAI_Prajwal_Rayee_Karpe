document.addEventListener('DOMContentLoaded',()=>{

    const grid=document.querySelector(".grid");

    const width=8;
    let score=0;

    const candies=[];

    const candyImages = [
        'url(assets/images/red-candy.png)',
        'url(assets/images/yellow-candy.png)',
        'url(assets/images/orange-candy.png)',
        'url(assets/images/purple-candy.png)',
        'url(assets/images/green-candy.png)',
        'url(assets/images/blue-candy.png)'
    ];

    function createBoard(){

        for (let i=0;i< width * width;i++){
        let candy=document.createElement('div');

        candy.setAttribute("draggable",true);
        candy.setAttribute("id",i);

        let randomImageIndex=Math.floor(Math.random() *candyImages.length);
        candy.style.backgroundImage=candyImages[randomImageIndex];
        grid.appendChild(candy);
        candies.push(candy)
    }
    }

createBoard();



let ImageBeingDragged;
let colorBeingDragged;
let candyBeingDragged;
let ImageBeingReplaced;



candies.forEach(candy => candy.addEventListener("dragStart",dragStart));
candies.forEach(candy => candy.addEventListener("dragEnd",dragEnd));
candies.forEach(candy => candy.addEventListener("dragOver",function(e){
    e.preventDefault();
}));
candies.forEach(candy => candy.addEventListener("dragLeave",dragLeave));
candies.forEach(candy => candy.addEventListener("dragEnter",function(e){
    e.preventDefault();
}));
candies.forEach(candy => candy.addEventListener("dragDrop",dragDrop));



document.getElementById("save_button").addEventListener('click',saveGame);

function dragStart(){
    colorBeingDragged=this.style.backgroundImage;
    candyBeingDragged=parseInt(this.id);
    
}

function dragLeave(){
    console.log(this.id,"Dragleave");
}


function generateRandomCandies(){

    for(let index=0;index<width*(width-1)-1;index++){
        
    }
}



function dragDrop(){

    ImageBeingReplaced=this.style.backgroundImage;
    candyBeingReplaced=parseInt(this.id);
    this.style.backgroundImage=ImageBeingDragged;
    candies[candyBeingDragged].style.backgroundImage=ImageBeingReplaced;
}

function dragEnd(){
    let validMoves = [
        candyBeingDragged + 1,
        candyBeingDragged - 1,
        candyBeingDragged + width,
        candyBeingDragged - width
    ]

    const len=width*width-2;

    for(let i=width-1;i<len;i+=width)
    invalidIndex.push(i,i+1);

    console.log(candyBeingReplaced, "In drag End",candyBeingDragged)

    
    const inValidMove=(candyBeingDragged+candyBeingReplaced) %width==width-1 && 
    (candyBeingDragged==width||candyBeingReplaced==width);
    const isValidMove = validMoves.includes(candyBeingReplaced) &&!inValidMove;
    if (candyBeingReplaced && isValidMove) {
        
        candyBeingReplaced = null;
        candyBeingDragged = null;
        colorBeingReplaced = null;
        colorBeingDragged = null;
    } else if (candyBeingReplaced && !isValidMove) {
        candies[candyBeingDragged].style.backgroundImage = ImageBeingDragged;
        candies[candyBeingReplaced].style.backgroundImage = ImageBeingReplaced;
    }


}

function generateRandomCandies() { 
    let len = width * (width - 1) - 1;  // 55
    for (let i = 0; i < len; i++) {
        if (candies[i + width].style.backgroundImage === '') {
            candies[i + width].style.backgroundImage = candies[i].style.backgroundImage
            candies[i].style.backgroundImage = ''
            // Candy in first row has no backgroud
            if (i < width && candies[i].style.backgroundImage == '') {
                candies[i].style.backgroundImage = candyImages[
                    Math.floor(Math.random() * candyImages.length)
                ];
            }
        }
    }
}


function checkRow(no_of_candies) {
    let invalidIndex = [];
    let len = width * width - no_of_candies
    for (let i = width - no_of_candies + 1; i <= len; i += width) {
        ///pushing elements in invalidIndex
        invalidIndex.push(i, i + 1);
        if (no_of_candies >= 4) invalidIndex.push(i + 2);
        if (no_of_candies == 5) invalidIndex.push(i + 3);
    }
    // console.log(no_of_candies, invalidIndex)
    for (let i = 0; i <= len; i++) {
        let candiesList = []
        //populate candiesList
        candiesList.push(i, i + 1, i + 2);
        if (no_of_candies >= 4) candiesList.push(i + 3);
        if (no_of_candies == 5) candiesList.push(i + 4);

        let desiredImage = candies[i].style.backgroundImage;

        /**
         * If i present in the  invalidIndex Array forget it;
         */
        if (invalidIndex.includes(i)) continue;
        /***
         * 
         * If Every Element satisfies the condition after arrow 
         * Or for every element the fuction returns true.
         * 
         * then the final result is true 
         */
        let match = candiesList.every(index => desiredImage != "" && candies[index].style.backgroundImage == desiredImage);
        if (match) {
            score += no_of_candies;
            // console.log(score)
            candiesList.forEach(index => candies[index].style.backgroundImage = "")
        }
    }

}

function checkColumnforFive() {
    let len = width * (width - 4);

    for (let i = 0; i < len; i++) {
        let fiveCandies = [i, i + width, i + width * 2, i + width * 3, i + width * 4];
        let desiredImage = candies[i].style.backgroundImage;

        /***
         * 
         * If Every Element satisfies the condition after arrow 
         * Or for every element the fuction returns true.
         * then the final result is true 
         * 
         */
        let match = fiveCandies.every(index => desiredImage != "" && candies[index].style.backgroundImage == desiredImage);
        if (match) {
            score += 5;
            console.log(score)
            fiveCandies.forEach(index => candies[index].style.backgroundImage = "")
        }

    }
}

function checkColumnforFour() {
    let len = width * (width - 3);

    for (let i = 0; i < len; i++) {
        let fourCandies = [i, i + width, i + width * 2, i + width * 3];
        let desiredImage = candies[i].style.backgroundImage;

        /***
         * 
         * If Every Element satisfies the condition after arrow 
         * Or for every element the fuction returns true.
         * then the final result is true 
         * 
         */
        let match = fourCandies.every(index => desiredImage != "" && candies[index].style.backgroundImage == desiredImage);
        if (match) {
            score += 4;
            console.log(score)
            fourCandies.forEach(index => candies[index].style.backgroundImage = "")
        }

    }
}

function checkColumnforThree() {
    let len = width * (width - 2);

    for (let i = 0; i < len; i++) {
        let threeCandies = [i, i + width, i + width * 2];
        let desiredImage = candies[i].style.backgroundImage;

        /***
         * 
         * If Every Element satisfies the condition after arrow 
         * Or for every element the fuction returns true.
         * then the final result is true 
         * 
         */

        let match = threeCandies.every(index => desiredImage != "" && candies[index].style.backgroundImage == desiredImage);
        if (match) {
            score += 3;
            console.log(score)
            threeCandies.forEach(index => candies[index].style.backgroundImage = "")
        }

    }
}

function saveGame(){


    let candiesInfo= [];
    candies.forEach(candy => candiesInfo[candy.id] = candy.style.backgroundImage);
    localStorage.setItem("board", JSON.stringify(candiesInfo));
}


function init() {
    checkRow(5);
    checkColumnforFive();
    checkRow(4);
    checkColumnforFour();
    checkRow(3);
    checkColumnforThree()
    generateRandomCandies();
}
init();


window.setInterval(function () {
    init()
}, 100);

});

/**
        Easy
---------------------------

*  Reduce columns checks to one function
*  Show the score on the page
*  Have a reset game button.
*  Have a shuffle game button and allow only 3 shuffles

*  Count number of Moves.
*  Have a win Condition
    
    Intermediate
---------------------------
* 
*   Make the game responsive  
* 
      Difficult  (Read About LocalStorage)
---------------------------
*  Share game with someone 
*  A Save game button  
*  On Refresh of page the game should not restart. 
* 
*/