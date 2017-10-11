var Controlleur=function(vue){

  var myVue=vue;
  var myModel=new WorkTimeBreakTimeHandler(myVue);

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
          var breakTimeInMinutes=myVue.getBreakTime();
          var breakTimeInMiliseconds=breakTimeInMinutes*60*1000;
          myModel.setBreakTime(workTimeInMinutes);
          myModel.setWorkTime(breakTimeInMinutes);
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
