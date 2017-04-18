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
  filteredLedger: Ledgers[] = [];
  vouchers: Voucher[] = [];
  firstAc: Ledgers[] = [];
  amount: number[] = [];
  type: string[] = [];
  narration: string;
  error: string;
  user: User;
  rows: number[] = [1];
  totalCredit: number = 0;
  totalDebit: number = 0;
  totalError: string;
  selectedCompany: string;
  voucherDate: Date;

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
        this.filteredLedger = ledgers;
      },
      error => { console.log(error) }
      );
  }

  addJournal() {
    let to_account: number[] = [];
    for (let i = 0; i < this.firstAc.length; i++) {
      if (this.type[i] == "credit") {
        to_account.push(this.firstAc[i]['id'])
      }
    }
    for (let i = 0; i < this.amount.length; i++) {
      let dataObject: any = {};
      if (this.type[i] == "credit") {
        dataObject['credit_amount'] = this.amount[i];
        dataObject['debit_amount'] = 0;
        dataObject['narration'] = this.narration;
        dataObject['for_account'] = this.firstAc[i]['id'];
        dataObject['to_Account'] = to_account;
        dataObject['company'] = parseInt(localStorage.getItem("company"));
        dataObject['date'] = this.voucherDate;
      }

      if (this.type[i] == "debit") {
        dataObject['credit_amount'] = 0;
        dataObject['debit_amount'] = this.amount[i];
        dataObject['narration'] = this.narration;
        dataObject['for_account'] = this.firstAc[i]['id'];
        dataObject['to_Account'] = to_account;
        dataObject['company'] = parseInt(localStorage.getItem("company"));
        dataObject['date'] = this.voucherDate;
      }
      let data = JSON.stringify(dataObject);
      this.voucherService.addVoucher(data)
        .subscribe(
        Voucher => {
          this.vouchers.push(Voucher);
          this.snackbar.open('Added ' + this.rows.length + " journal entry", 'X')
        },
        error => { this.error = <any>error }
        );
    }
  }

  filterLedger(event: any) {
    this.filteredLedger = [];
    for (let i = 0; i < this.ledgers.length; i++) {
      if (this.ledgers[i]['name'].includes(event)) {
        this.filteredLedger.push(this.ledgers[i])
      }
    }
  }

  selectLedger(query: string, index: number) {
    for (let i = 0; i < this.ledgers.length; i++) {
      if (query === this.ledgers[i]['name'])
        this.firstAc[index] = this.ledgers[i];
    }
  }

  addRows() {
    this.rows.push(1);
  }

  selectType(event: any, index: number) {
    this.totalCredit = 0;
    this.totalDebit = 0;
    this.type[index] = event['value'];
    for (let i = 0; i < this.amount.length; i++) {
      if (this.type[i] == "credit") {
        this.totalCredit += this.amount[i];
      }
      if (this.type[i] == "debit") {
        this.totalDebit += this.amount[i];
      }
    }
  }

  selectAmount(value: any, index: number) {
    this.totalCredit = 0;
    this.totalDebit = 0;
    this.amount[index] = parseInt(value);
    for (let i = 0; i < this.amount.length; i++) {
      if (this.type[i] == "credit") {
        this.totalCredit = this.amount[i] + this.totalCredit;
      }
      if (this.type[i] == "debit") {
        this.totalDebit += this.amount[i];
      }
    }
  }

  checkTotal() {
    if (this.totalCredit == this.totalDebit) {
      this.totalError = "";
      return false;
    }
    this.totalError = "Total of Credits not Equal to Total of Debits";
    return true;
  }

  public constructor(private titleService: Title, private LedgersService: LedgersService, public snackbar: MdSnackBar, private voucherService: VoucherService, private userService: UserService) {
    userService.user$.subscribe(
      User => {
        this.user = User;
      });
  }
}
