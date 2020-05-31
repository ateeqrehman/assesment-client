import { Component, OnInit } from '@angular/core';
import { Phone } from '../model/Phone';
import { Observable } from 'rxjs';
import { PhoneService } from '../service/phone.service';

@Component({
  selector: 'app-phone-details',
  templateUrl: './phone-details.component.html',
  styleUrls: ['./phone-details.component.sass']
})
export class PhoneDetailsComponent implements OnInit {
  phoneList : Observable<Phone[]>;

  constructor(private employeeService: PhoneService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.phoneList = this.employeeService.getAllPhoneCombinations();
  }
}``