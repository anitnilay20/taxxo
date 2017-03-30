import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company/company.service';
import { Title } from '@angular/platform-browser';
import { Company, TrialBalance, ProfitLoss } from '../model';
import { MdSnackBar } from '@angular/material';

@Component({
	selector: 'dashboardhome',
	templateUrl: 'dashboardhome.component.html',
	providers: [CompanyService]
})

export class DashboardhomeComponent implements OnInit {
	companies: Company[];
	selectedCompany: any;
	trialBalances: TrialBalance[];
	profitLoss: ProfitLoss[];
	expense: any[];
	income: any[];
	getCompany() {
		this.companyService.getCompany()
			.subscribe(
			companies => { this.companies = companies; console.log(this.companies); },
			error => { console.log(error); }
			);
	}

	getTrialBalance(company: Company) {
		this.companyService.getTrialBalance(company.id)
			.subscribe(
			TrialBalance => { this.trialBalances = TrialBalance; console.log(this.trialBalances); },
			error => { console.log(error); }
			);
	}

	getProfitLoss(company: Company) {
		this.companyService.getProfitLoss(company.id)
			.subscribe(
			ProfitLoss => {
				this.profitLoss = ProfitLoss; console.log(this.profitLoss);
				this.expense = this.profitLoss['expense'];
				this.income = this.profitLoss['income'];
			},
			error => { console.log(error); }
			);
	}

	selectCompany(company: Company) {
		this.getProfitLoss(company);
		this.getTrialBalance(company);
		this.selectedCompany = company;
		localStorage.setItem('company', String(company.id));
		localStorage.setItem('companyName', company.name);
		this.snackbar.open('Using Company ' + company.name, 'X', {
			duration: 5000,
		});
	}

	constructor(private titleService: Title, private companyService: CompanyService, public snackbar: MdSnackBar) { }

	ngOnInit() {
		this.titleService.setTitle('Your Dashboard || Home');
		this.getCompany();
	}
}