// JavaScript Document
var groceryList = [];

document.addEventListener('deviceready', function(ev) {
//document.addEventListener("DOMContentLoaded", function(ev){
  //this runs when the page loads
	localStorage.clear();
  
  if(localStorage.getItem("grocery-harv0116")){
    groceryList = JSON.parse(localStorage.getItem("grocery-harv0116"));
    //convert from String to Array
  }
  
  showList();
  
  
  // put hammer here for add button
  var addButton = document.querySelector("#btnAdd");
  
   var mchammertime = new Hammer(addButton);	
			var Tap2 = new Hammer.Tap({event: 'tap' });
			mchammertime.add([Tap2]);

			mchammertime.on('tap', function(ev) {
				ev.preventDefault();
				console.log(ev);
				textBox = document.querySelector("#item").value;
				textBox = textBox.toString();
				textBoxTrimmed = trim(textBox);   
				if (textBoxTrimmed == "") 
				{
					// do not add to local storage
					// we do not want to add blank entries
				} else {
					newItem = "      ";	
					newItem += document.querySelector("#item").value;   // add the class tagged to the data
					groceryList.push( newItem );
					localStorage.setItem("grocery-harv0116", JSON.stringify(groceryList) );
					//convert from Array to String.
					document.getElementById('item').value='';
					
					showList();
					return false;
				}
			});

});

function removeItem(ev){
  var txt = ev.target.firstChild.nodeValue;
  
  for(var i=0;i<groceryList.length;i++){
	if(groceryList[i].substring(6) == txt){      // need to parse groceryList[i] to remove the first 6 letters
      //found the match
      groceryList.splice(i, 1);
    }
  }
  localStorage.setItem("grocery-harv0116", JSON.stringify(groceryList) );
  showList();
}

function changeItem(ev){
// turn colour to grey
  var txt = ev.target.firstChild.nodeValue;
  
  for(var i=0;i<groceryList.length;i++){
	if(groceryList[i].substring(6) == txt){      // need to parse groceryList[i] to remove the first 6 letters
      //found the match
      	if (ev.target.className == "tagged") {
			groceryList[i] = "      " + groceryList[i].substring(6);
			ev.target.className = "";
		} else {
			ev.target.className = "tagged";
			groceryList[i] = "tagged" + groceryList[i].substring(6);
		}
    }
  }

	localStorage.setItem("grocery-harv0116", JSON.stringify(groceryList) );
	// somehow update the localstorage variable with tagged.
}

function showList(){
  var output = document.getElementById("output");
  output.innerHTML = "";
  var ul = document.createElement("ul");
  ul.className = "listview";
  output.appendChild(ul);
  
  for(var i=0;i<groceryList.length;i++){
    var li = document.createElement("li");
	li.className = groceryList[i].substring(0, 6);  // get first 6 letters - class name
    li.innerHTML = groceryList[i].substring(6);  
    ul.appendChild(li);
  }
  
  var listview = document.querySelector('ul');		
		
	var hammertime = new Hammer.Manager(listview);	
	var singleTap = new Hammer.Tap({ event: 'singletap' });
	var swiperight = new Hammer.Swipe({event: 'swiperight' });
	hammertime.add([swiperight]);
	hammertime.add([singleTap]);
	
	 hammertime.on('singletap', function(ev) {
		ev.preventDefault();
		
		changeItem(ev);
	});
	hammertime.on('swiperight', function(ev) {
		ev.preventDefault();
		
		removeItem(ev);
	}); 
}

function trim(str) {
        return str.replace(/^\s+|\s+$/g,"");
}