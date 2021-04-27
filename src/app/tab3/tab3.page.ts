import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  post : any = {}

  constructor(
    private http : HttpClient,
    private loadCtrl :LoadingController,
    public toastCtrl: ToastController
  ) {}

  public async loaderPresent(): Promise<any>{
    const loading = await this.loadCtrl.create({
      message: "LOADING....",
      backdropDismiss: true
    })
    await loading.present();
    return loading;
  }  

  async submit(){
    let loading = await this.loaderPresent()

    this.http.post("https://reqres.in/api/users?page=2", this.post).subscribe((res: any)=>{
      console.log(res)
      this.toastCtrl.create({
          duration : 4000,
          message  : "Id : " + res.id + ", email : " + res.email + ", First Name : " + res.first_name + ", Last Name : " + res.last_name  
      }).then(l=>l.present())
      if(loading){
        loading.dismiss()
      }
    })
  }

  async delete(){
    if(confirm("Are you sure to delete this data?")) {
      let loading = await this.loaderPresent()
    this.http.delete("https://reqres.in/api/users?page=2", this.post).subscribe((res: any)=>{
      console.log(res)
      this.toastCtrl.create({
          duration : 3000,
          message  : "Data sudah terhapus"
      }).then(l=>l.present())
      if(loading){
        loading.dismiss()
      }
    })
    }
    
  }

  async update(){
    let loading = await this.loaderPresent()

    this.http.put("https://reqres.in/api/users?page=2", this.post).subscribe((res: any)=>{
      console.log(res)
      this.toastCtrl.create({
          duration : 4000,
          message  : "Mengupdate data dengan Id : " + res.id + " menjadi -> email : " + res.email + ", First Name : " + res.first_name + ", Last Name : " + res.last_name  
      }).then(l=>l.present())
      if(loading){
        loading.dismiss()
      }
    })
  }
  
}
