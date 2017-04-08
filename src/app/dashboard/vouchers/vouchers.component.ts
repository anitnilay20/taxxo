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
  vouchers: Voucher[] = [];
  firstAc: number;
  secondAc: number;
  amount: number;
  narration: string;
  error: string;
  user: User;
  selectedCompany = localStorage.getItem('companyName');
  ngOnInit() {
    this.titleService.setTitle("Your Dashboard || Vouchers");
    this.getLedgers();
  }

  changeFirstAc(event: string) {
    this.firstAc = event['value'].id;
  }
  changeSecondAc(event: string) {
    this.secondAc = event['value'].id;
  }

  getLedgers() {
    this.LedgersService.getLedgers()
      .subscribe(
      ledgers => { this.ledgers = ledgers; console.log(this.ledgers); },
      error => { console.log(error) }
      );
  }

  addVouchers(type: string) {
    let dataObject: any = {};
    dataObject['firstAccount'] = this.firstAc;
    dataObject['secondAccount'] = this.secondAc;
    dataObject['amount'] = this.amount;
    dataObject['narration'] = this.narration;
    dataObject['company'] = localStorage.getItem('company');
    dataObject['addedBy'] = parseInt(localStorage.getItem('user'));
    let data = JSON.stringify(dataObject);
    this.voucherService.addVoucher(data, type)
      .subscribe(
      Voucher => {
        this.vouchers.push(Voucher);
        this.snackbar.open(type + ' Added ', 'X')
      },
      error => this.error = <any>error
      );
  }

  public constructor(private titleService: Title, private LedgersService: LedgersService, public snackbar: MdSnackBar, private voucherService: VoucherService, private userService: UserService) {
    userService.user$.subscribe(
      User => {
        this.user = User;
      });
  }
}
