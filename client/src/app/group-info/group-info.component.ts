import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { services } from '../services/services';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss']
})
export class GroupInfoComponent {
  @Input() grpid;
  conversation:any={};
  allUsers=[]
  grpName="";grpDesc="";
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  grpNameValid: boolean = true;
  selectedItemsValid: boolean = true;
  currUser:any={}
 
  constructor(public services:services,public modalService: NgbModal) {}

  @Output() backClicked: EventEmitter<string> = new EventEmitter();
  ngOnInit(): void {

    this.currUser=this.services.getstoreduser();
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'userName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    
  this.allUsers=this.services.getallstoredUsers();
   // this.allUsers=this.services.allusers;

this.getConv()

  }

  getConv()
  {
    this.services.getGroupMessages(this.grpid).subscribe((res:any)=>{
   
      this.conversation=res
      
    this.allUsers = this.allUsers.filter((user) => {
      const isCurrentUser = user._id == this.currUser._id;
      const isMember = res.members.some(
        (member) => member._id == user._id
      );
      return !isCurrentUser && !isMember;
    });
    console.log("Grps",this.allUsers);
    })
   
  }

  removeMember(memId:any)
  {
this.services.removeMemberFromGroup(this.grpid,memId).subscribe((res:any)=>{
  console.log(res);
})
  }
  addMember()
  {
    this.selectedItems.forEach((item:any)=>{

      this.services.addMemberToGroup(this.grpid,item).subscribe((res:any)=>{
        console.log(res)
    })
})
  }

   
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
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
