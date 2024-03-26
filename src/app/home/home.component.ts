import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { PanService } from '../pan.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  pancardform!: FormGroup;
  editpancardform!: FormGroup;
  pancard: any;
  pid: any;
  constructor(private form: FormBuilder, private api: PanService) {}
  ngOnInit(): void {
    this.pancardform = this.form.group({
      Cardholder: [''],
      purpose: [''],
      fathername: [''],
      email: [''],
      mobile: [''],
    });
    this.editpancardform = this.form.group({
      Cardholder: [''],
      purpose: [''],
      fathername: [''],
      email: [''],
      mobile: [''],
    });
    this.api.getdata().subscribe((res: any) => {
      this.pancard = res;
      console.log(this.pancard, 'pancard');
    });
  }

  submit() {
    this.api.carddata(this.pancardform.value).subscribe((res: any) => {
      console.log('res', res);
       window.location.reload();
    });
  }
  edit(p: any) {
    console.log(p, 'pancard');
    this.pid = p._id;
    console.log(this.pid);
    this.editpancardform.patchValue({
      Cardholder: p.Cardholder,
      purpose: p.purpose,
      fathername: p.fathername,
      email: p.email,
      mobile: p.mobile,
    });
   
  }
  updatepan() {
    this.api
      .editpandata(this.pid, this.editpancardform.value)
      .subscribe((res: any) => {
        console.log(res, 'edit pan');
      });
    alert('update successfully');
    window.location.reload();
  }

  
  deletepan(d: any) {
    let a = d._id;
    console.log(a);
    this.api.deletPancard(a).subscribe((res: any) => {
      console.log(res);
    });
   
    window.location.reload();
  }
}
