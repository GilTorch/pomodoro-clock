
/*var WorkTimeBreakTimeHandler=function(passedVue){

  var myVue=passedVue;
  var workTimer=new Timer(myVue);
  var breakTimer=new Timer(myVue);
  var breakTimerEnds=false;
  var workTimerEnds=false;


  this.setBreakTimerMiliseconds=function(breakTimerMiliseconds){
    breakTimer.setMiliseconds(breakTimerMiliseconds);
  }

  this.setWorkTimerMiliseconds=function(workTimerMiliseconds){
    workTimer.setMiliseconds(workTimerMiliseconds);
  }

  this.handleBreakTimeWorkTime=function(){
    if(workTimer.getMiliseconds!==0)
      launchWorkTimer();
  }

  var launchWorkTimer=function(){
    workTimerEnds=false;
    breakTimerEnds=true;
    workTimer.startTimer();
  }

  var launchBreakTimer=function(){
    workTimerEnds=true;
    breakTimerEnds=false;
    workTimer.startTimer();
  }

  var stopTimer=function(){

  }


}*/


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


var Pomodoro=function(passedVue){

  var myVue=passedVue;
  var intervalHandler;
  var timeoutHandler;
  var breakTimerMiliseconds=0;
  var workTimerMiliseconds=0;
  var minutes=0;
  var seconds=0;
  var timerAlreadyStarted=false;
  var currentTimer="Work Time";

  this.setBreakTimerMiliseconds=function(passedMiliseconds){
     if(timerAlreadyStarted===false)
        breaktimerMiliseconds=passedMiliseconds;
  }

  this.setWorkTimerMiliseconds=function(passedMiliseconds){
        workTimerMiliseconds=passedMiliseconds;
  }

  this.setVue=function(vue)
  {
      myVue=vue;
  }

  var startTimer=function(){
    if(timerAlreadyStarted===false)
    {
      timerAlreadyStarted=true;
      if(currentTimer==="Work Time")
      {
        alert(currentTimer);
        miliseconds=workTimerMiliseconds;
        console.log(miliseconds);
        intervalHandler=setInterval(outputTime,1000);
        timeoutHandler=setTimeout(timerIsEnding,workTimerMiliseconds);
      }
      else {
        miliseconds=breakTimerMiliseconds;
        intervalHandler=setInterval(outputTime,1000);
        timeoutHandler=setTimeout(timerIsEnding,breakTimerMiliseconds);
      }
    }
    else{
      console.log("Timer Already Started!!!");
    }

  }

  this.startPomodoro=function(){
    startTimer();
  }

  function timerIsEnding(){
    currentTimer=("Work Time")?"Break Time":"Work Time";
    timerAlreadyStarted=false;
    minutes=0;
    seconds=0;
    clearInterval(intervalHandler);
    clearInterval(timeoutHandler);
    alert("STOP!");
    alert(currentTimer);
    startTimer();
    alert("STOP MOUSTIQUE!");
  }

  this.stopCurrentTimer=function(){
    timerAlreadyStarted=false;
    minutes=0;
    seconds=0;
    clearInterval(intervalHandler);
    clearInterval(timeoutHandler);
  }

  this.resetCurrentTimer=function(){
      this.stopCurrentTimer();
      currentTimer="Work Time";
      startTimer();
  }


  function outputTime(){

    if(myVue==="undefined")
        return new Error("No vue defined");

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
  var myModel=new Pomodoro(myVue);
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
     var workTimeInMiliseconds=myVue.getWorkTime()*60*1000;
     var breakTimeInMiliseconds=myVue.getBreakTime()*60*1000;
     myModel.setWorkTimerMiliseconds(workTimeInMiliseconds);
     myModel.setBreakTimerMiliseconds(breakTimeInMiliseconds);
     myModel.startPomodoro();
  break;
  case "pause-timer":
    console.log("timer paused!");
  break;
  case "stop-timer":
    console.log("timer stopped!");
    myModel.stopCurrentTimer();
  break;
  case "reset-timer":
    console.log("timer reset!");
      alert("reset!");
     myModel.resetCurrentTimer();
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
