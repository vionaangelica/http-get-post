import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  dataPOST = []


  constructor(
    private http : HttpClient,
    private loadCtrl :LoadingController,
  ) {}
  
    ionViewDidEnter(){
      this.getDataPost();
    }

  public async loaderPresent(): Promise<any>{
    const loading = await this.loadCtrl.create({
      message: "LOADING....",
      backdropDismiss: true
    })
    await loading.present();
    return loading;
  }  

  async getDataPost(){
    let loading = await this.loaderPresent()
    this.http.get("https://reqres.in/api/users?page=2").subscribe((res : any)=>{
      console.log(res);
      this.dataPOST = res
      if(loading){
        loading.dismiss()
      }
    });
  }

 
}
