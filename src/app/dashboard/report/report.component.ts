import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Company, TrialBalance, BalanceSheet, ProfitLoss } from '../model';
import { CompanyService } from '../company/company.service';
import { Title } from '@angular/platform-browser';


@Component({
	selector: 'report',
	templateUrl: 'report.component.html',
	providers: [CompanyService]
})

export class Reportcomponent implements OnChanges {
	@Input() company: Company;
	trialBalances: TrialBalance[];
	profitLoss: ProfitLoss[];
	currentDate: Date;

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

	ngOnChanges(changes: SimpleChanges) {
		this.getReport();
	}

}