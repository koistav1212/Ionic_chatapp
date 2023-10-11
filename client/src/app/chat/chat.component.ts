import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { services } from '../services/services';
import * as io from "socket.io-client";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() conversation:any={};currConv={};
  messageList=[]
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() backClicked: EventEmitter<string> = new EventEmitter();
  @ViewChild('testMsg') testMsgTextarea !: ElementRef;
  emojiPickerVisible: any;
  message:any = '';
  constructor(public service:services,public modalService: NgbModal) {
    
 //   this.socket = io('http://localhost:5000',{withCredentials: true, transports: ["websocket"]});
  }
  socket = io.connect('https://angular-chatapp.onrender.com/', {withCredentials: true, transports: ["websocket"]});
currUser:any={}

  async ngOnInit(): Promise<void> {
    
    console.log("ChatConv",this.conversation)
    this.messageList=this.conversation.message
    this.getNewMessages();
    this.getAllUsers();
    (await this.service.getCurrUser()).subscribe((res:any)=>{
      this.currUser=res.user;})

      
  }
  submitMessage(event: any) {
    let value = event.target.value.trim();
    this.message = '';
    if (event.key === 'Enter') {
    if (this.conversation.grpName == null) {
      this.currConv = {
        "conversationId": this.conversation._id,
        "reciverId": this.conversation.members.reciverId,
        "senderId": this.currUser._id,
        "text": value,
        "timestamps": Date.now()
      };
  
      if (value.length < 1) return false;
  
      this.service.addMessage(this.currConv).subscribe((data: any) => {
        console.log(data);
        this.socket.emit('save-message', `Message - Sent by: ${this.currUser._id}`);
        this.ngOnInit();
      });
    } else {
      this.currConv = {
        "grpId": this.conversation._id,
        "senderId": this.currUser._id,
        "senderName": this.currUser.userName,
        "text": value,
        "timestamps": Date.now()
      };
  
      if (value.length < 1) return false;
  
      this.service.addMsgToGroup(this.conversation._id, this.currConv).subscribe((data: any) => {
        this.socket.emit('save-message', `Message - Sent by: ${this.currUser._id}`);
        this.ngOnInit();
      });
    }
  }
  return ''
  }
  

  emojiClicked(event:any) {
    this.message += event.emoji.native;
  }
  getAllMessages()
  { if(this.conversation.grpName==null){
    this.service.getMessages(this.conversation._id).subscribe((data:any)=>{
      
      let x=data.message.sort((a:any, b:any) => b.timestamps - a.timestamps);
      this.messageList=x
    })}
    else{
      this.service.getGroupMessages(this.conversation._id).subscribe((data:any)=>{
        console.log("chat_get",data);
        let x=data.message.sort((a:any, b:any) => b.timestamps - a.timestamps);
      this.messageList=x
      })
    }
  }

  getNewMessages()
  {
    this.socket.on('new-message', () => {
      this.getAllMessages();
    });
  }
  handleBackClick() {
    // Emit the "back" event
    this.backClicked.emit('back');
  }
  allUsers=[]
  getAllUsers(){
     this.service.getallUsers({}).subscribe((res:any)=>{

      this.allUsers=res.userList
    })  
  }
  formatTimestamp(messages: any): string {
    if(messages){
    const today = new Date();
    const messageDate = new Date(parseInt(messages));
  
    // Check if the message date is the same day as today
    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      // Today: Display time
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (
      messageDate.getDate() === today.getDate() - 1 &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      // Yesterday: Display time
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      // Other days: Display full date with time
      return messageDate.toLocaleString(); // This includes both date and time
    }}
    return "";
  }
  
  getUserProfilePic(userId: string): string {
    const user:any = this.allUsers.find((u:any) => u._id === userId);
   
    return user.profilePic ? user.profilePic : '../../../../assets/background/user_icon.png';
  }
  getUserName(userId: string): string {
    const user:any = this.allUsers.find((u:any) => u._id === userId);
    return user ? user.userName : 'New User';
  }
  
  openModal(userlist: any) {
    this.modalService.open(userlist, { ariaLabelledBy: 'modal-basic-title', windowClass: 'after-submit-popup',centered:true }).result.then((result) => {
  
    }, (res:any) => {
      if (res) {
     
      }
    });
  }
}
