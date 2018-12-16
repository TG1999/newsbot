var socket=io();
var sender="";
var rcvr="";
$(function () {
    $.ajax({url: "/abc",contentType:'application/json', success: function(result){
        var friends=result.arr;
        $.each(friends, function( key, value ) {
            $(".sidenav").append(`<button value=${value} id=${value} class="but" style="background:none;border:none">${value}</button>`)
            $(`#${value}`).click(function(){
                rcvr=this.value;
                {
                    $.ajax({url:`/db/${sender}/${rcvr}`,contentType:'application/json',success:function(result){
                        console.log(result);
                    }})
                    }
                socket.emit('addrecpt',{rcvr:rcvr,sender:sender})
            })
        });
    }})
    socket.on('recvother',(data)=>{
        console.log('confirmation call others')
        console.log(data);
            $("#msglist").append(
                $("<li>").text(`${rcvr}:${data.message}`)
            )    
    }) 
    socket.on('recvmyself',(data)=>{
        console.log('confirmation call myself')
        console.log(data);
            $("#msglist").append(
                $("<li>").text(`${sender}:${data.message}`)
            )    
    })     
  });
 function loginsender(event){
var x=document.getElementById('log').value
document.getElementById('log').value='';
sender=x;
 } 
  function adddata1(event) {
var x=document.getElementById('msg').value
document.getElementById('msg').value='';
console.log(rcvr,sender,x);
socket.emit('send',{message:x,recv:rcvr,sender:sender})
  }