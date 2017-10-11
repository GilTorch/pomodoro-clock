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
