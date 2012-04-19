$.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (!results)
    { 
        return 0; 
    }
    return results[1] || 0;
}

function setParam(key, val) {
    window.location.search = jQuery.query.set(key, val);
}

var getKeys = function(obj){
   var keys = [];
   for(var key in obj){
      keys.push(key);
   }
   return keys;
}

function nightToDay() {
    nightElements = $('.night');
    for (ii in nightElements) {
        nightElements[ii].className = "day";
    }
    document.getElementById("nightButton").style.display = "inline";
    document.getElementById("dayButton").style.display = "none";
}

function dayToNight() {
    dayElements = $('.day');
    
    for (ii in dayElements) {
        dayElements[ii].className = "night";
    }
    document.getElementById("dayButton").style.display = "inline";
    document.getElementById("nightButton").style.display = "none";
    
}

function iPhoneCheck() {
    // If the user is on an iPhone, redirect to the mobile site
    if((navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPod/i))) {
        var question = confirm("Would you like to view the iPhone WebApp instead?");
        
        if (question) {
            window.location = "m/index.html";
        }
    }
}

function showObjects(toShow) {
    objects = $(".objectListRow");

    for (var ii = 0; ii < objects.length; ii++) {
        if (objects[ii].id == toShow) {
            objects[ii].style.display = "table-row";
        } else {
            objects[ii].style.display = "none";
        }
    }
}