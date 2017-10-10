
var WorkTimeBreakTimeHandler=function(passedVue){
  
  var myVue=passedVue;
  var workTimer=workTimerPassed;
  var breakTimer=breakTimerPassed;
  var breakTimerEnds=false;
  var workTimerEnds=false;
  
  
  this.setBreakTimer=function(breakTimer){
    breakTimer=breakTimer;
  }
  
  this.setWorkTimer=function(workTimer){
    workTimer=workTimer;
  }
  
  this.launchWorkTimer=function(){
    breakTimerEnds=true;
    workTimerEnds=false;
    workTimer.setMiliseconds(myVue.getWorkTime());
    workTimer.startTimer();
  }
  
  this.launchBreakTimer=function(){
    workTimerEnds=true;
    breakTimerEnds=true;
    breakTimer.setMiliseconds(myVue.getBreakTime());
    workTimer.startTimer();
  }
  
}


function notifyMe(title,message){
  if(!("Notification" in window))
    {
      alert("This browser does not support system notifications");
    }
  else if(Notification.permission==="granted")
    {
      notify(title,message);
    }
  else if(Notification.permission!=="denied")
    {
      Notification.requestPermission(function(permission){
         if(permission==="granted"){
           notify(title,message);
         }
      });
     
    }
}



function notify(title,message){
  var notification=new Notification(title,
      {
    icon:"http://res.cloudinary.com/dejyp5iex/image/upload/v1506105771/Pomodoro-Clock-Design-by_Gilbert_fqaerz.png",
    body:message,
  });
  setTimeout(notification.close.bind(notification),5000);
}


var Timer=function(passedVue){
  
  var myVue=passedVue;
  
  var miliseconds=0;
  
  var minutes=0;
  
  var seconds=0;
  
  var intervalHandler;
  var timeoutHandler;
  this.timerEnds=false;
  var timerAlreadyStarted=false;
  
    this.setMiliseconds=function(passedMiliseconds){
     if(timerAlreadyStarted===false)
        miliseconds=passedMiliseconds;
  }
  
  this.setVue=function(vue)
  {
    myVue=vue;
  }
  
 var stopTimer=function(){
  timerAlreadyStarted=false;
  minutes=0;
  seconds=0;
  clearInterval(intervalHandler);
  clearInterval(timeoutHandler);
  this.timerEnds=true;
  // var breakTimeInMinutes=parseInt(myVue.getBreakTime());
  // var breakTimeInMiliseconds=breakTimeInMinutes*1000*60;
  // this.setMiliseconds(breakTimeInMiliseconds);
  // this.startTimer();
}
  

  
  function outputTime(){
    var minutesAAfficher="00";
    seconds++;
    if(seconds>0 && seconds%60===0)
      {    
        seconds=0;
        minutes++;    
      }

    if(seconds<10)
      seconds="0"+seconds;
   
    if(minutes<10)
    {
      minutesAAfficher="0"+minutes;
    }
    else{
      minutesAAfficher=minutes;
    }
    var k=1000*60;
    var milisecondsToMinutes=miliseconds/k;
    var output=minutesAAfficher+":"+seconds+" / "+milisecondsToMinutes+":00";
    myVue.updateTimer(output);
    
    console.log(output); 
  }
  
  
this.startTimer=function(){
 
 if(timerAlreadyStarted===false)
  {
      timerAlreadyStarted=true;
      this.timerEnds=false;
      intervalHandler=setInterval(outputTime,1000);
      timeoutHandler=setTimeout(stopTimer,miliseconds);
  }
  else
  {
   
         notifyMe("Caution!","Timer already started. Press reset to reset the timer or press pause to pause the timer!");
  }

}

this.forcedStop=function(){
  timerAlreadyStarted=false;
  minutes=0;
  seconds=0;
  clearInterval(intervalHandler);
  clearInterval(timeoutHandler);
}



this.resetTimer=function(){
  this.forcedStop();
  this.startTimer();
}
  
}


  

var Vue=function(){
  
  var timerOutput=$("#timerOutput");
  var workTimeAmountOutput=$("#workTimeAmount");
  var breakTimeAmountOutput=$("#breakTimeAmount");
  
  this.getWorkTime=function(){
    return workTimeAmountOutput.html();
  }
  
  this.getBreakTime=function(){
    return breakTimeAmountOutput.html();
  }
  
  this.updateTimer=function(str){
     console.log("Men ni: "+str)
     timerOutput.html(str);
  }
  
  this.updateTimeAmount=function(str,which){
    str=str.toLowerCase();
    var actions=["increment","decrement"];
    var whichTime=["workTime","breakTime"];
    
    if(actions.indexOf(str)===-1 && whichTime.indexOf(which)===-1)
      {
        return -1;
      }
    console.log(which+","+str);
    if(which==="workTime")
    {
      if(str==="increment")
      {
        var workTimeAmountTemp=workTimeAmountOutput.html();
        workTimeAmountTemp++;
        workTimeAmountOutput.html(" "+workTimeAmountTemp+" ");
      }
    else if(str==="decrement")
      {
        var workTimeAmountTemp=workTimeAmountOutput.html();
        if(workTimeAmountTemp>1)
           workTimeAmountTemp--;
        workTimeAmountOutput.html(" "+workTimeAmountTemp+" ");
      }
    }
    else{
      if(str==="increment")
      {
        var breakTimeAmountTemp=breakTimeAmountOutput.html();
       
        breakTimeAmountTemp++;
        breakTimeAmountOutput.html(" "+breakTimeAmountTemp+" ");
      }
    else if(str==="decrement")
      {
        var breakTimeAmountTemp=breakTimeAmountOutput.html();
        if(breakTimeAmountTemp>1)
          breakTimeAmountTemp--;
        breakTimeAmountOutput.html(" "+breakTimeAmountTemp+" ");
      }
    }
    
  }
  
  
}


var Controlleur=function(vue){
  
  var myVue=vue;
  var myModel=new WorkTimeBreakTimeHandler():
  
  this.setVue=function(passedVue){
     myVue=passedVue;
  }
  
  var boutons=$("button");
  this.gestionDesClicks=function(){
  boutons.click(function(){
  switch($(this).attr("id"))
  {
  case "start-timer":
    console.log("timer started!");
     var workTimeInMinutes=myVue.getWorkTime();
     var workTimeInMiliseconds=workTimeInMinutes*60*1000;
     myModel.setMiliseconds(workTimeInMiliseconds);
     myModel.startTimer();
  break;
  case "pause-timer":
    console.log("timer paused!");
  break;
  case "stop-timer":
    console.log("timer stopped!");
    myModel.forcedStop();
  break;
  case "reset-timer":
    console.log("timer reset!");
      alert("reset!");
     myModel.resetTimer();
  break;
  case "increaseBreakTime":
    console.log("Increase Break Time!");
      myVue.updateTimeAmount("increment","breakTime");
  break;
  case "decreaseBreakTime":
     console.log("Decrease Break Time!");
      myVue.updateTimeAmount("decrement","breakTime");
  break;
  case "increaseWorkTime":
     console.log("Increase Work Time!");
     myVue.updateTimeAmount("increment","workTime");
  break;
  case "decreaseWorkTime":
     console.log("Decrease Work Time!");
      myVue.updateTimeAmount("decrement","workTime");
  break;      
  }
  
});
}
  
}
         
         
$(document).ready(function(){
  var myVue=new Vue();
  var myControlleur=new Controlleur(myVue);
  myControlleur.gestionDesClicks();
  
})