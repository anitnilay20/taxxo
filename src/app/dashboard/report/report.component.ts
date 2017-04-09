import { Component, OnInit,Input } from '@angular/core';
import { Company, TrialBalance, BalanceSheet, ProfitLoss } from '../model';
import { CompanyService } from '../company/company.service';
import { Title } from '@angular/platform-browser';


@Component({
	selector: 'report',
	templateUrl: 'report.component.html',
	providers: [CompanyService]
})

export class Reportcomponent implements OnInit{
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

	getProfitLoss(company: Company) {
		this.companyService.getProfitLoss(company.id)
			.subscribe(
			ProfitLoss => {
				this.profitLoss = ProfitLoss; console.log(this.profitLoss);
				this.expense = this.profitLoss['expense'];
				this.income = this.profitLoss['income'];
				this.calculateProfitLossTotal();
			},
			error => { console.log(error); }
			);
	}

	getBalancesheet(company: Company) {
		this.companyService.getBalanceSheet(company.id)
			.subscribe(
			BALANCESHEET => {
				this.capital_account = BALANCESHEET['capital_account']
				this.curent_liabilities = BALANCESHEET['current_liabilities']
				this.current_assets = BALANCESHEET['current_assets']
				this.loans_liability = BALANCESHEET['loans_liability']
			},
			error => { console.log(error); }
			);
	}
    calculateProfitLossTotal() {
		var totalExpense = 0, totalIncome = 0;
		for (let i = 0; i < this.expense.length; i++) {
			let amount = this.expense[i].amount;
			totalExpense += amount;
		}

		for (let i = 0; i < this.income.length; i++) {
			let amount = this.income[i].amount;
			totalIncome += amount;
		}
		this.totalExpense = totalExpense;
		this.totalIncome = totalIncome;
	}

	constructor(private companyService: CompanyService) {
	}

    getReport(){
        this.currentDate = new Date();
        this.getProfitLoss(this.company);
		this.getTrialBalance(this.company);
		this.getBalancesheet(this.company);
    }

    ngOnChanges(){
        this.getReport();
    }
    ngOnInit() {
		
	}
}