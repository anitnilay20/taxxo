import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company/company.service';
import { Title } from '@angular/platform-browser';
import { Company, TrialBalance, ProfitLoss, User, BalanceSheet } from '../model';
import { MdSnackBar } from '@angular/material';


@Component({
	selector: 'dashboardhome',
	templateUrl: 'dashboardhome.component.html',
	providers: [CompanyService]
})

export class DashboardhomeComponent implements OnInit {
	companies: Company[];
	selectedCompany: Company;
	trialBalances: TrialBalance[];
	profitLoss: ProfitLoss[];
	expense: any[];
	income: any[];
	totalExpense: number;
	totalIncome: number;
	currentDate: Date;
	balanceSheets: BalanceSheet;
	current_assets: any[];
	loans_liability: any[];
	curent_liabilities: any[];
	capital_account: any[];

	getCompany() {
		this.companyService.getCompany()
			.subscribe(
			companies => { this.companies = companies; console.log(this.companies); },
			error => { console.log(error); }
			);
	}


	selectCompany(company: Company) {
		this.selectedCompany = company;
		localStorage.setItem('company', String(company.id));
		localStorage.setItem('companyName', company.name);
		this.snackbar.open('Using Company ' + company.name, 'X', {
			duration: 5000,
		});
	}
	constructor(private titleService: Title, private companyService: CompanyService, public snackbar: MdSnackBar) {
	}

	ngOnInit() {
		this.titleService.setTitle('Your Dashboard || Home');
		this.getCompany();
		this.currentDate = new Date();
	}
}