import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  dataPOST = []
  post : any = {}


  constructor(
    private http : HttpClient,
    private loadCtrl :LoadingController,
    public toastCtrl: ToastController
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
    this.http.get("http://jsonplaceholder.typicode.com/posts").subscribe((res : any)=>{
      console.log(res);
      this.dataPOST = res
      if(loading){
        loading.dismiss()
      }
    });
  }

  submit(){
    this.http.post("http://jsonplaceholder.typicode.com/posts", this.post).subscribe((res: any)=>{
      console.log(res)
      this.toastCtrl.create({
          duration : 3000,
          message  : "ID for new item is " + res.id 
      }).then(l=>l.present())
    })
  }
}
