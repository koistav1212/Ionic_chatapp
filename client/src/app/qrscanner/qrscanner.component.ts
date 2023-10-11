import { AfterViewInit,Component, OnInit, ViewChild } from '@angular/core';
import {
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
  NgxScannerQrcodeService,
  NgxScannerQrcodeComponent,
  ScannerQRCodeSelectedFiles,
} from 'ngx-scanner-qrcode';
import { services } from '../services/services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss'],
})
export class QrscannerComponent  implements OnInit {
  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
        height:window.innerHeight,
        
      },
      audio:false
    },isBeep:false,
    vibrate:0

  };
  ngOnInit(): void {}
    public qrCodeResult: any= [];
    public qrCodeResult2: any = [];
  
    @ViewChild('action') action!: NgxScannerQrcodeComponent;
  
    constructor(private qrcode: NgxScannerQrcodeService,private services : services,private router:Router) { }
  
    ngAfterViewInit(): void {
      this.action.isReady.subscribe((res: any) => {
        // this.handle(this.action, 'start');
      });
    }
  
    public onEvent(e: ScannerQRCodeResult[], action?: any): void {
      // e && action && action.pause();
      console.log(e);
      const qrCodeValue = e[0].value;
      if (qrCodeValue) {
        
console.log("qrscanner",qrCodeValue)
        this.services.getuserbyId(qrCodeValue).subscribe((result: any) => {
          console.log("qruser",result)
          this.services.setCurrUser(result, {});
          this.router.navigate(['/dashboard']).then((val:any)=>{
            this.action.stop();
          }) // Navigate to the login screen
         
         
        });
      }
    }
  
    public handle(action: any, fn: string): void {
      const playDeviceFacingBack = (devices: any[]) => {
        // front camera or back camera check here!
        const device = devices.find(f => (/back|rear|environment/gi.test(f.label))); // Default Back Facing Camera
        action.playDevice(device ? device.deviceId : devices[0].deviceId);
      }
  
      if (fn === 'start') {
        action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r));
      } else {
        action[fn]().subscribe((r: any) => console.log(fn, r), alert);
      }
    }
  
    public onDowload(action: NgxScannerQrcodeComponent) {
      action.download().subscribe(console.log, alert);
    }
    scanningActive=true;
    public onSelects(files: any) {
      if (this.scanningActive) { // Check if scanning is active
        this.qrcode.loadFiles(files, 0.5).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
          this.qrCodeResult = res;
    
          // Check if there's a QR code result
          if (this.qrCodeResult && this.qrCodeResult.length > 0) {
            const qrCodeValue = this.qrCodeResult[0].value;
    console.log("qrscanner",qrCodeValue)
            this.services.getuserbyId(qrCodeValue).subscribe((result: any) => {
              this.services.setCurrUser(result, {});
              this.router.navigate(['/login']); // Navigate to the login screen
              this.scanningActive = false; // Stop scanning
              this.action.stop();
            });
          }
        });
      }
    }
    
    public onSelects2(files: any) {
      this.qrcode.loadFilesToScan(files, this.config, 0.5).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
        console.log(res);
        this.qrCodeResult2 = res;

        
this.services.getuserbyId(this.qrCodeResult[0].value).subscribe((result:any)=>{
  this.services.setCurrUser(result,{})
  this.router.navigate(["/dashboard"])

})
      });
    }
  }

