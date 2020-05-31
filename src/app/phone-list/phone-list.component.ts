import { Component, OnInit } from '@angular/core';
import { Phone } from '../model/Phone';
import { Observable } from 'rxjs';
import { PhoneService } from '../service/phone.service';
import { NgForm } from '@angular/forms';  
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { PagerService } from '../service/pager.service';

@Component({
  selector: 'app-phone-details',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.sass']
})
export class PhoneListComponent implements OnInit {
  phoneList : Observable<Phone[]>;
  userAddressValidations: FormGroup;
  login_form: FormGroup;
  submitted = false;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";  
  phoneNumber;
  isValidFormSubmitted = false;  

    // array of all items to be paged
    protected allItems: any[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];
    total: number = 0;

  constructor(private employeeService: PhoneService,private formBuilder: FormBuilder, private pagerService: PagerService) {
    this.login_form = formBuilder.group({
      'phone': [null, Validators.compose([Validators.required, Validators.pattern( /^([0-9]{7})$|(^[0-9]{10})$/)])]
    });
  }

  ngOnInit() {
    this.userAddressValidations = this.formBuilder.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]]
    });
  }

  _keyPress(event: any) {
    const pattern = /^([0-9]{7})$|(^[0-9]{10})$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();

    }
}

numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}

  getPhoneList() {
    this.phoneNumber = this.login_form.controls['phone'].value
    this.employeeService.getPhoneList(this.phoneNumber).subscribe((data) => {
        this.allItems = data;
        this.total= this.allItems.length;
        this.setPage(1);
    });
  }

  onSubmit() {
    
    this.submitted = true;
    this.getPhoneList();
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
}``