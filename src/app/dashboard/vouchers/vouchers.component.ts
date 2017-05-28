import { Component, OnInit, } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Company, Ledgers, Voucher, User } from '../model';
import { CalendarModule } from 'primeng/primeng';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { LedgersService } from '../ledgers/ledgers.service';
import { VoucherService } from './vouchers.service';
import { UserService } from '../../signup/signup.service';
import { SalesComponent } from './sales/sales.component';


@Component({
  selector: 'vouchers',
  templateUrl: 'vouchers.component.html',
  providers: [LedgersService, VoucherService]
})

export class VouchersComponent implements OnInit {

  ledgers: Ledgers[];
  selectedCompany: string;
  response: any[] = [];
  dataObject: any = {};
  shouldExpand = false;
  ngOnInit() {
    this.getLedgers();
    this.init();
  }

  init() {
    this.selectedCompany = localStorage.getItem('companyName');
    this.titleService.setTitle("Your Dashboard || Vouchers");
  }

  responseHandler(response: any, type: string) {
    response['name'] = type;
    this.shouldExpand = true;
    this.response.push(response);
    this.dataObject['Response'] = this.response;
    return true;
  }

  getLedgers() {
    this.LedgersService.getLedgers()
      .subscribe(
      ledgers => {
        this.ledgers = ledgers;
      },
      error => { console.log(error) }
      );
  }

  public constructor(private titleService: Title, private LedgersService: LedgersService, public snackbar: MdSnackBar, private voucherService: VoucherService, private userService: UserService) {
  }
}
