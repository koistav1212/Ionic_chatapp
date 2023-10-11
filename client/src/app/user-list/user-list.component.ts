import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { services } from '../services/services';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

import {MatTabsModule} from '@angular/material/tabs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  
  @Output() backClicked: EventEmitter<string> = new EventEmitter();
  constructor(private services:services,private afAuth:AngularFireAuth,private modalService :NgbModal) {}
  allUsers=[]
  grpName="";grpDesc="";

  selectedItems = [];
  dropdownSettings = {};
  grpNameValid: boolean = true;
  selectedItemsValid: boolean = true;

  async ngOnInit() {
    (await this.services.getCurrUser()).subscribe((res:any)=>{
      this.getAllUsers(res.user)
    })
       

    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'userName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
     }
  
  getAllUsers(data:any){
  
    this.services.getallUsers(data).subscribe((res:any)=>{
      
      this.allUsers=res.userList
    })  
  }
  closeModal(){
    this.modalService.dismissAll()
  }
  
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  async createGrp()
  {    if (this.grpName.trim() === '') {
    this.grpNameValid = false;
  } else {
    this.grpNameValid = true;
  }

  if (this.selectedItems.length === 0) {
    this.selectedItemsValid = false;
  } else {
    this.selectedItemsValid = true;
  }

  if (this.grpNameValid && this.selectedItemsValid) {
    (await (this.services.getCurrUser())).subscribe((res:any)=>{
      this.selectedItems.push({_id:res.user._id,userName:res.user.userName});
      this.services.createGroup({members:this.selectedItems,grpName:this.grpName,grpDesc:this.grpDesc,timestamps:Date.now()}).subscribe((res:any)=>{
        console.log(res);
      })
    })

}
  }
}
