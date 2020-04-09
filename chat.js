var mySocket= new WebSocket ("ws://localhost:8000");
var nickname = prompt("Enter your Nickname")
let chat=document.getElementsByTagName("textarea")[0];
let online=document.getElementById("online");
var text=document.getElementById("message");
let onlineusers=[];

mySocket.onopen=function(){
    console.log("open")
    mySocket.send(JSON.stringify({type:"login",data:nickname}));
}
mySocket.onmessage=function(e){
    arr=e.data.split(":")[0];
    msgbody=e.data.split(":")[1];
    if(arr=="online")
    {
        onlineusers.push(msgbody)
        console.log(onlineusers)
        for(i=0;i<onlineusers.length;i++){
        online.innerText +=`\n ${onlineusers[i]}\n`;}
    }
    else{
        chat.value += `${e.data}\n`;
    }
    console.log(arr);

}

function sendmessage(){
       console.log("lolo",mySocket);
         var msg=text.value;
         mySocket.send(JSON.stringify({type:"msg","nickname":nickname,data:msg}));
         chat.value += `Me: ${msg}\n`;
         text.value="";}


