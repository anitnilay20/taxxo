import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Company, Ledgers, Voucher, User } from '../model';
import { CalendarModule } from 'primeng/primeng';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { LedgersService } from '../ledgers/ledgers.service';
import { VoucherService } from './vouchers.service';
import { UserService } from '../../signup/signup.service';


@Component({
  selector: 'vouchers',
  templateUrl: 'vouchers.component.html',
  providers: [LedgersService, VoucherService]
})

export class VouchersComponent implements OnInit {
  ledgers: Ledgers[];
  selectedCompany: string;
  ngOnInit() {
    this.getLedgers();
    this.init();
  }

  init() {
    this.selectedCompany = localStorage.getItem('companyName');
    this.titleService.setTitle("Your Dashboard || Vouchers");
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
