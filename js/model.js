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
