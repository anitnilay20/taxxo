import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Company, Activity } from '../model'
import { CompanyService } from './company.service'
import { CalendarModule } from 'primeng/primeng';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';


@Component({
  selector: 'company',
  templateUrl: 'company.component.html',
  providers: [CompanyService]
})

export class CompanyComponent implements OnInit {
  errorMessage: string;
  selectedCompany: any;
  mode = 'Observable';
  companies: Company[];
  activities: Activity[];
  show_amounts_in_millions: boolean = false;
  accounts_with_inventory: boolean = false;
  public addCompanyForm = this.fb.group({
    financial_year_from: ["", Validators.required],
    books_beginning_from: ["", Validators.required],
    address: ["", Validators.required],
    country: ["", Validators.required],
    city: ["", Validators.required],
    state: ["", Validators.required],
    pin_code: ["", Validators.required],
    currency_symbols: ["", Validators.required],
    accounts_with_inventory: ["", Validators.required],
    show_amounts_in_millions: ["", Validators.required],
    name: ["", Validators.required],
    email: ["", Validators.required],
    telephone_number: ["", Validators.required],
    alias_name: ["", Validators.required]
  });

  ngOnInit() {
    this.titleService.setTitle("Your Dashboard || Comapny");
    this.getCompany();

  };

  selectCompany(company: Company) {
    localStorage.setItem("company", String(company.id));
    localStorage.setItem("companyName", company.name);
    this.selectedCompany = company;
    this.snackbar.open("Using Company " + company.name, "X", {
      duration: 5000,
    });
    this.companyService.getActivity(company.id)
      .subscribe(
      Activity => { this.activities = Activity; console.log(this.activities); },
      error => { console.log(error) }
      );
  }

  getCompany() {
    this.companyService.getCompany()
      .subscribe(
      companies => { this.companies = companies; console.log(this.companies); },
      error => { console.log(error) }
      );
  }

  addCompany() {
    let formobj = this.addCompanyForm.getRawValue();
    formobj['admin'] = 4;
    formobj['accounts_with_inventory'] = this.accounts_with_inventory;
    formobj['show_amounts_in_millions'] = this.show_amounts_in_millions;
    let data = JSON.stringify(formobj);
    this.companyService.addCompany(data)
      .subscribe(
      Company => {
        this.companies.push(Company); console.log(this.companies);
        this.addCompanyForm.reset();
        this.snackbar.open("Company Added", "X");
      },
      error => this.errorMessage = <any>error
      );
  }

  change_accounts_with_inventory() {
    if (this.accounts_with_inventory === false)
    { this.accounts_with_inventory = true; }
    else { this.show_amounts_in_millions = false; }
  }
  change_show_amounts_in_millions() {
    if (this.show_amounts_in_millions === false)
    { this.show_amounts_in_millions = true; }
    else { this.show_amounts_in_millions = false; }
  }

  public constructor(private titleService: Title, private companyService: CompanyService, public snackbar: MdSnackBar,
    public fb: FormBuilder
  ) { }
}