import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanService {

  constructor(private http:HttpClient ) { }
  carddata(data:any){
    return this.http.post('http://localhost:4500/pancard/addHolderDetails',data)
  }
  getdata(){
    return this.http.get('http://localhost:4500/pancard/holderlist')
  }
  editpandata(id:any,data:any){
    return this.http.put('http://localhost:4500/pancard/updatePancard/'+id,data)
  }
  deletPancard(id:any){
    return this.http.delete('http://localhost:4500/pancard/deleteflasepandetails/'+id)
  }


}
