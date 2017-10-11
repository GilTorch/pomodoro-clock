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
