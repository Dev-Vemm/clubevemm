import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { LoadingController, NavParams } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-perfl-foto',
  templateUrl: './perfl-foto.component.html',
  styleUrls: ['./perfl-foto.component.scss'],
})
export class PerflFotoComponent implements OnInit {
  uid: string;
  loading: any;
  img: string;
  constructor(
    private navParam: NavParams,
    private camera: Camera, 
    private loadingCtrl: LoadingController,
    private service: DataService,
    private file: File,
  ) { }

  ngOnInit() {}

  async abrirCamera(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
       mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    await this.camera.getPicture(options).then((imageData) =>{
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.uploadImg(base64Image);
    }).catch((err) =>{
      console.log(err);
    });
  }

  async abrirGaleria(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
       mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    await this.camera.getPicture(options).then((imageData) =>{
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.uploadImg(base64Image);
    }).catch((err) =>{
      console.log(err);
    });
  }

  async uploadImg(file){
    await this.presentLoading();
    try{
      let vals = {
        uid: this.uid,
        file: file
      }; 
      const result:any = await this.service.requestPost(vals, 'atualizarImg');
      this.img = result['img'];
    }catch(err){
      console.log(err);
      this.loading.dismiss();
    }finally{
      this.loading.dismiss();
      this.navParam.data.popover.dismiss({img: this.img});
    }
  }

  async presentLoading(){
    this.loading = await this.loadingCtrl.create({
      message: 'Carregando a imagem...',
      spinner: 'dots'
    });
    return this.loading.present();
  }

}
