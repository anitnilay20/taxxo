import { Component, OnInit, Input } from '@angular/core';
import { Ledgers, Voucher, User } from "../../model";
import { MdSnackBar } from "@angular/material/material";
import { VoucherService } from "../vouchers.service";

@Component({
	selector: 'sales',
	moduleId: module.id,
	templateUrl: './sales/sales.component.html',
})

export class SalesComponent {
	@Input() ledgers: Ledgers[];
	@Input() filteredLedger: Ledgers[] = [];
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
	voucherDate: Date;

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
			}

			if (this.type[i] == "debit") {
				dataObject['credit_amount'] = 0;
				dataObject['debit_amount'] = this.amount[i];
			}
			dataObject['narration'] = this.narration;
			dataObject['for_account'] = this.firstAc[i]['id'];
			dataObject['to_Account'] = to_account;
			dataObject['company'] = parseInt(localStorage.getItem("company"));
			dataObject['date'] = this.voucherDate;
			dataObject['added_by'] = parseInt(localStorage.getItem("user"))
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

	public constructor(public snackbar: MdSnackBar, private voucherService: VoucherService) {

	}

}

