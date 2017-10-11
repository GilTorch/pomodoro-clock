
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
