//turn counter
let counterDisplayElem = document.querySelector('.counter-display');
let counterPlusElem = document.getElementById('next-turn');

let count = 0;

var amtcards = 10;

counterPlusElem.addEventListener("click",()=>{
    count++;
    updateDisplay();
});

function updateDisplay(){
    counterDisplayElem.innerHTML = "Turn: " + count;
}


function Discardcard(cardID, cardlabel)
{
    document.getElementById(cardID).style.visibility = "hidden";//make display = "none" when needed for the cards to move
    document.getElementById(cardlabel).style.visibility = "hidden";
}


//function for the mana toggle labels
function manalabel(cardlabel, number)
{
  const label = document.getElementById(cardlabel);
  //if no mana 1
  if(label.innerHTML.indexOf("mana") === -1){
    label.innerHTML += "<br> mana: " + number;
  }
  //if mana: 1 already shown delete it
  else if(label.innerHTML.indexOf("mana: " + number) !== -1){
    //counterDisplayElem.innerHTML = "were here" + label.innerHTML.indexOf("mana") + " 0: " + label.innerHTML.charAt("1") + 
    //  "char: " + label.innerHTML.charAt(12) + " length: " + label.innerText.length;
    /*counterDisplayElem.innerHTML = "hi " + label.innerHTML.substring(0, label.innerHTML.indexOf("mana")-6);
    label.innerHTML = label.innerHTML.substring(0, label.innerHTML.indexOf("<br /> mana")) + 
      label.innerHTML.substring(label.innerHTML.indexOf("1"), label.innerHTML.length-1);//possible problem is label.length doesnt work*/
    const labelArray = label.innerHTML.split("<br>");
    label.innerHTML = "";
    for(var i = 0; i < labelArray.length; i++) {
      if(labelArray[i].indexOf("mana") === -1) {
        label.innerHTML += labelArray[i] + "<br>";
      }
    }
    label.innerHTML = label.innerHTML.substring(0, label.innerHTML.lastIndexOf("<br>"));
      
  }
  //if other mana number
  else {
    const labelArray = label.innerHTML.split("<br>");
    label.innerHTML = "";
    for(var i = 0; i < labelArray.length; i++) {
      if(labelArray[i].indexOf("mana") === -1) {
        label.innerHTML += labelArray[i] + "<br>";
      }
      else {
        label.innerHTML += labelArray[i].replace(/[0-9]/g, number) + "<br>";
      }
    }
    label.innerHTML = label.innerHTML.substring(0, label.innerHTML.lastIndexOf("<br>"));
  }
}

function cardtypelabel(cardlabel, cardtype)
{
  const label = document.getElementById(cardlabel);
  //if no cardtype
  if(label.innerHTML.indexOf("unit") === -1 && label.innerHTML.indexOf("spell") === -1
    && label.innerHTML.indexOf("champion") === -1 && label.innerHTML.indexOf("landmark") === -1){
    label.innerHTML += "<br>" + cardtype;
  }
  //if same card type delete
  else if(label.innerHTML.indexOf(cardtype) !== -1) {
    const labelArray = label.innerHTML.split("<br>");
    label.innerHTML = "";
    for(var i = 0; i < labelArray.length; i++) {
      if(labelArray[i].indexOf(cardtype) === -1) {
        label.innerHTML += labelArray[i] + "<br>";
      }
    }
    label.innerHTML = label.innerHTML.substring(0, label.innerHTML.lastIndexOf("<br>"));
  }
  //if different cardtype
  else {
    const labelArray = label.innerHTML.split("<br>");
    label.innerHTML = "";
    for(var i = 0; i < labelArray.length; i++) {
      if(labelArray[i].indexOf("unit") === -1 && labelArray[i].indexOf("spell") === -1
      && labelArray[i].indexOf("champion") === -1 && labelArray[i].indexOf("landmark") === -1) {
        label.innerHTML += labelArray[i] + "<br>";
      }
      else {
        label.innerHTML += cardtype + "<br>";
      }
    }
    label.innerHTML = label.innerHTML.substring(0, label.innerHTML.lastIndexOf("<br>"));
  }
}

//seperate all cards into a div class of toggle cards that interact with clicking the cards (this may also need to be split into markers and deleting/adding)
//the second group are cards that do not interact with clicking the cards

//main function for cards
function ButtonSelected(buttonID)
{
    //remove all other active button classes - set them to inactive
    var buttons = document.getElementsByClassName("button active");

    //var querybuttons = document.querySelectorAll(".button active");
    for(var i = 0; i < buttons.length; i++){
      if(buttons[i].classList.contains("active")){
        buttons[i].classList.add("inactive");
        buttons[i].classList.remove("active");
      }
    }
    
    var pressedbutton = document.getElementById(buttonID);


    //if statement for non-toggle buttons - if they are non-toggle class, go into a switch case to do the correct thing-
    if(pressedbutton.classList.contains("inactive")){
      pressedbutton.classList.remove("inactive");
      pressedbutton.classList.add("active");
      return;
    }

    switch(buttonID) {

      case "next-turn":
      case "draw":
      case "create":
      case "manifest":
      case "nab":
      case "fleeting":
      case "predicted-draw":
      case "restart":
      default: throw "Issue with button selection occured";
    }
}

function cardSelected(selectedcard, cardlabel)
{
    //check which button is currently active
    //use a switch case to choose the correct action based on which button is currently active
    var activeButton = document.getElementsByClassName("button active");
    switch(activeButton[0].id) {
      case "discard-play":
        Discardcard(selectedcard, cardlabel);
      case "1":
        manalabel(cardlabel, 1);
        break;
      case "2":
        manalabel(cardlabel, 2);
        break;
      case "3":
        manalabel(cardlabel, 3);
        break;
      case "4":
        manalabel(cardlabel, 4);
        break;
      case "5":
        manalabel(cardlabel, 5);
        break;
      case "6":
        manalabel(cardlabel, 6);
        break;
      case "7":
        manalabel(cardlabel, 7);
        break;
      case "8":
        manalabel(cardlabel, 8);
        break;
      case "9":
        manalabel(cardlabel, 9);
        break;
      case "unit":
        cardtypelabel(cardlabel, "unit");
        break;
      case "spell":
        cardtypelabel(cardlabel, "spell");
        break;
      case "champion":
        cardtypelabel(cardlabel, "champion");
        break;
      case "landmark":
        cardtypelabel(cardlabel, "landmark");
        break;
      case "token":
        document.getElementById(cardlabel).innerHTML += " <br /> token";
        break;
      case "shown":
        document.getElementById(cardlabel).innerHTML += " <br /> shown";
        break;
      case "move-to-end":
      default: //do nothing;
    }
    activeButton[0].classList.add("inactive");
    activeButton[0].classList.remove("active");
}