import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company/company.service'
import { Title } from '@angular/platform-browser';
import { Company } from '../model';
import { MdSnackBar } from '@angular/material';
import { TrialBalance } from '../model';


@Component({
	selector: 'dashboardhome',
	templateUrl: 'dashboardhome.component.html',
	providers: [CompanyService]
})

export class DashboardhomeComponent implements OnInit {
	companies: Company[];
	selectedCompany: any;
	trialBalances: TrialBalance[];

	getCompany() {
		this.companyService.getCompany()
			.subscribe(
			companies => { this.companies = companies; console.log(this.companies); },
			error => { console.log(error) }
			);
	}

	selectCompany(company: Company) {
		localStorage.setItem("company", String(company.id));
		localStorage.setItem("companyName", company.name);
		this.selectedCompany = company;
		this.snackbar.open("Using Company " + company.name, "X", {
			duration: 5000,
		});
		this.companyService.getTrialBalance(company.id)
			.subscribe(
			TrialBalance => { this.trialBalances = TrialBalance; console.log(this.trialBalances); },
			error => { console.log(error) }
			);
	}


	constructor(private titleService: Title, private companyService: CompanyService, public snackbar: MdSnackBar) { }

	ngOnInit() {
		this.titleService.setTitle("Your Dashboard || Home");
		this.getCompany()
	}
}