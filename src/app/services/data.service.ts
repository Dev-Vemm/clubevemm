import { Injectable } from '@angular/core';
import { config } from '../configs/config';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataService {
	private url = config.url;
  	private headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST, GET, PUT, OPTIONS, DELETE, PATCH',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
    };

  	constructor(
      private http: HTTP, 
      private storage: NativeStorage, 
      private client: HttpClient,
      private wStorage: Storage
    ) {}

    isCordovaAvailable(){
    if (!(<any>window).cordova) {
      return false;
    }
      return true;
    }

  	async requestGet(vals, endpoint){
  		if(this.isCordovaAvailable()){
        return new Promise((resolve, reject) =>{
          this.http.get(this.url + endpoint, vals, this.headers).then((data)=>{
            let parsedData = JSON.parse(data['data']);
            console.log(parsedData);
            resolve(parsedData);
          }).catch((err) =>{
            console.log(err);
            reject(err);
          });
        });
      }else{
        return new Promise((resolve, reject) =>{
          this.client.get(this.url + endpoint, vals).subscribe((data)=>{
            let parsedData = data;
            console.log(parsedData);
            resolve(parsedData);
          },
          (err) =>{
            console.log(err);
            reject(err);
          });
        });
      }
  	}

  	async requestPost(vals, endpoint){
    	if(this.isCordovaAvailable()){
        return new Promise((resolve, reject) =>{
          this.http.post(this.url + endpoint, vals, this.headers).then((data)=>{
            let parsedData = JSON.parse(data['data']);
            console.log(parsedData);
            resolve(parsedData);
          }).catch((err) =>{
            console.log(err);
            reject(err);
          });
        });
      }else{
        return new Promise((resolve, reject) =>{
          this.client.post(this.url + endpoint, vals).subscribe((data)=>{
            let parsedData = data;
            console.log(parsedData);
            resolve(parsedData);
          },
          (err) =>{
            console.log(err);
            reject(err);
          });
        });
      }
  	}

    async setStorage(key, arr){
      if(this.isCordovaAvailable()){
        await this.storage.setItem(key, arr);
      }else{
        await this.wStorage.set(key, arr);
      }
    }

    async getStorage(key){
      return new Promise((resolve, reject) =>{
        try{
          let s: any;
          if(this.isCordovaAvailable()){
            s = this.storage.getItem(key);
          }else{
            s = this.wStorage.get(key);
          }
          s.then((res)=>{
            resolve(res);
          });
        }catch(err){
          reject(err);
        }
      });
    }

    async removeStorage(key){
      if(this.isCordovaAvailable()){
        await this.storage.remove(key);
      }else{
        await this.wStorage.remove(key);
      }
    }
}
