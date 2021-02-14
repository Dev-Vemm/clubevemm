import { Injectable } from '@angular/core';
import { config } from '../configs/config';
import { HTTP } from '@ionic-native/http/ngx'; 
import { NativeStorage } from '@ionic-native/native-storage/ngx';

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

  	constructor(private http: HTTP, private storage: NativeStorage) {}

  	async requestGet(vals, endpoint){
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
  	}

  	async requestPost(vals, endpoint){
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
  	}

    async setStorage(key, arr){
      await this.storage.setItem(key, arr);
    }

    async getStorage(key){
      return new Promise((resolve, reject) =>{
        try{
          this.storage.getItem(key).then((res)=>{
          resolve(res);
          });
        }catch(err){
          reject(err);
        }
      });
    }
}
