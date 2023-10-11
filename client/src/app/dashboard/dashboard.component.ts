import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { services } from '../services/services';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ChatComponent } from '../chat/chat.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  conversation:any={};conversations=[];
  hideMatIcon=false;screenSize=false;
  @ViewChild('fabicon') fabIcon!: ElementRef;
  constructor( public modalService: NgbModal,private services:services,private chat:ChatComponent,private cdRef: ChangeDetectorRef) { }

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
    this.chat.conversation = conversation;
    this.cdRef.detectChanges();
  }
  onChatBackClicked(event: string) {
    this.conversation = {}; 
    
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
