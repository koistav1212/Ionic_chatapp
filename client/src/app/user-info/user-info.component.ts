
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { services } from '../services/services';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  @Input() userId;
  user:any={};
  allgroups:any=[];
  myGroups = [
    { name: 'Group 1' },
    { name: 'Group 2' },
    { name: 'Group 3' },
    // Add more groups as needed
  ];
  constructor(public services:services,public modalService: NgbModal) {}

  ngOnInit(): void {
  this.getuserByid();
  

  }

getuserByid()
{
  this.services.getuserbyId(this.userId).subscribe((res:any)=>{
    this.user=res.user;
    this.getAllgroups();
  })
}
  getAllgroups()
  {
    this.services.getGroups(this.user.rooms).subscribe((res:any)=>{
      this.allgroups=res;
      console.log("groups",res)
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
      return "Today "+ messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (
      messageDate.getDate() === today.getDate() - 1 &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      // Yesterday: Display time
      return "Yesterday "+ messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      // Other days: Display full date with time
      return messageDate.toLocaleString(); // This includes both date and time
    }}
    return "";
  }
  
  closeModal(){
    this.modalService.dismissAll()
  }
}
