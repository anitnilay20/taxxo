import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Company, Ledgers } from '../model'
import { CompanyService } from '../company/company.service'
import { CalendarModule } from 'primeng/primeng';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { LedgersService } from './ledgers.service'


@Component({
  selector: 'ledgers',
  templateUrl: 'ledgers.component.html',
  providers: [CompanyService, LedgersService]
})

export class LedgersComponent implements OnInit {
  ledgers: Ledgers[];
  mode: 'Observable';
  error: string;
  inventory: boolean;
  groups: string;
  selectedLedger: Ledgers;
  selectedCompany = localStorage.getItem('companyName');
  public addLedgerForm = this.fb.group({
    name: ["", Validators.required],
    groups: ["", Validators.required],
    opening_balance: ["", Validators.required],
    inventory: ["", Validators.required],
  })
  ngOnInit() {
    this.titleService.setTitle("Your Dashboard || Ledgers");
    this.getLedgers();
  }

  getLedgers() {
    this.LedgersService.getLedgers()
      .subscribe(
      ledgers => { this.ledgers = ledgers; console.log(this.ledgers); },
      error => { console.log(error) }
      );
  }

  addLedger() {
    let formobj = this.addLedgerForm.getRawValue();
    formobj['company'] = localStorage.getItem('company')
    formobj['inventory'] = this.inventory;
    formobj['type'] = 'Accounts';
    formobj['groups'] = this.groups;
    let data = JSON.stringify(formobj);
    this.LedgersService.addLedgers(data)
      .subscribe(
      Ledger => {
        this.ledgers.push(Ledger); console.log(this.ledgers);
        this.addLedgerForm.reset();
        this.snackbar.open("Ledger Added", "X");
      },
      error => this.error = <any>error
      );
  }

  public constructor(private titleService: Title, private LedgersService: LedgersService, public snackbar: MdSnackBar,
    public fb: FormBuilder
  ) { }

  change_inventory() {
    if (this.inventory === true)
      this.inventory = false;
    else
      this.inventory = true;
  }

  select_accounts(value: string) {
    this.groups = value['value'];
  }

  selectLedger(ledger: any) {
    this.selectedLedger = ledger;
  }

  accounts = ["bank OCC AC",
    "bank OD AC",
    "branch Division",
    "capital AC",
    "cash in hand",
    "current assets",
    "current liabilities",
    "deposits assets",
    "direct expenses",
    "direct income",
    "duties n taxes",
    "expenses direct",
    "expenses indirect",
    "fixed assets",
    "income direct",
    "income indirect",
    "indirect expenses",
    "indirect income",
    "investments",
    "loans n advances assets",
    "loan liability",
    "misc exoenses",
    "provisions",
    "purchase AC",
    "reserve n surpulus",
    "retaines earnings",
    "sales accounts",
    "secured loans",
    "stock in hand",
    "sundry creditors",
    "sundry debitors",
    "suspense Account",
    "unsecured loans",]
}