import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { services } from '../services/services';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  conversation:any={};conversations=[];
  hideMatIcon=false;screenSize=false;
  @ViewChild('fabicon') fabIcon!: ElementRef;
  constructor( public modalService: NgbModal,private services:services) { }

  @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;
  ngOnInit(): void {
    console.log(this.conversation)
    this.screenSize = window.innerWidth < 800;
  }
  user=true;
  onConversationSelected(conversation:any){
    console.log(conversation)
    this.conversation = conversation;
   
    this.hideMatIcon=true
    document.getElementById('chatContainer').classList.add('app-chat-visible');

  }
  onChatBackClicked(event: string) {
    // Hide the chat component by setting conversation to null or whatever logic you have
    this.conversation = {}; // You should replace this with your own logic
    
    this.hideMatIcon=false;
    this.ngOnInit()
    document.getElementById('chatContainer').classList.remove('app-chat-visible');
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Check window width and toggle hideMatIcon accordingly
    this.screenSize = window.innerWidth < 800;
  }
  
  openModal(userlist: any) {
    this.modalService.open(userlist, { ariaLabelledBy: 'modal-basic-title', windowClass: 'after-submit-popup',centered:true }).result.then((result) => {
  
    }, (res:any) => {
      if (res) {
     
      }
    });
  }
}
