import { Component, OnInit, Input } from '@angular/core';
import { Company, TrialBalance, BalanceSheet, ProfitLoss } from '../model';
import { CompanyService } from '../company/company.service';
import { Title } from '@angular/platform-browser';


@Component({
	selector: 'report',
	templateUrl: 'report.component.html',
	providers: [CompanyService]
})

export class Reportcomponent implements OnInit {
	@Input() company: Company;
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

	getTrialBalance(company: Company) {
		this.companyService.getTrialBalance(company.id)
			.subscribe(
			TrialBalance => { this.trialBalances = TrialBalance; console.log(this.trialBalances) },
			error => { console.log(error); }
			);
	}



	constructor(private companyService: CompanyService) {
	}

	getReport() {
		this.currentDate = new Date();
		this.getTrialBalance(this.company);
	}

	ngOnChanges() {
		this.getReport();
	}
	ngOnInit() {

	}
}