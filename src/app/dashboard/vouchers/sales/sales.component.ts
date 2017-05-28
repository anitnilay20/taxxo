import { Component, OnInit, Input, Output, SimpleChange, EventEmitter } from '@angular/core';
import { Ledgers, Voucher, User } from "../../model";
import { MdSnackBar } from "@angular/material";
import { VoucherService } from "../vouchers.service";

@Component({
	selector: 'sales',
	templateUrl: 'sales.component.html',
})

export class SalesComponent {
	@Input() ledgers: Ledgers[];
	@Input() filteredLedger: Ledgers[] = [];
	@Output() salesResponse: EventEmitter<any> = new EventEmitter<any>();
	vouchers: any[] = [];
	partyAccount: Ledgers;
	firstAc: Ledgers[] = [];
	rate: number[] = [];
	quantity: number[] = [];
	amount: number[] = [];
	narration: string = "  ";
	paymentType: string;
	totalAmount: number = 0;
	rows: number[] = [1];
	error: string;
	responseError: string;
	user: User;
	voucherDate: Date;

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

	selectPartyAccount(query: string) {
		for (let i = 0; i < this.ledgers.length; i++) {
			if (query === this.ledgers[i]['name'])
				this.partyAccount = this.ledgers[i];
		}
	}

	selectType(event: any) {
		this.paymentType = event['value'];
	}

	addRows() {
		this.rows.push(1);
	}

	rateChangeHandler(rateInput: number, i: number) {
		this.rate[i] = rateInput;
		this.amount[i] = rateInput * this.quantity[i];
		this.calculateTotalAmount();
	}

	quantityChangeHandler(quantityInput: number, i: number) {
		this.quantity[i] = quantityInput;
		this.amount[i] = quantityInput * this.rate[i];
		this.calculateTotalAmount();
	}

	calculateTotalAmount() {
		this.totalAmount = 0;
		for (let i = 0; i < this.amount.length; i++) {
			this.totalAmount += this.amount[i];
		}
	}

	validateData() {
		if (!this.paymentType) {
			this.error = "Please select Payement Type";
			return true;
		}
		if (!this.partyAccount) {
			this.error = "Please enter Party Name";
			return true;
		}
		if (!this.voucherDate) {
			this.error = "Please Enter Date";
			return true;
		}
		if (this.amount.length != this.firstAc.length || this.quantity.length != this.rate.length) {
			this.error = "Please fill in All the details above";
			return true;
		}
		this.error = ""
		return false;
	}

	createData() {
		let dataObject: any = {};
		let itemsObject: any = {};
		let salesObject: any = {};
		let itemsArray: any = [];
		for (let i = 0; i < this.firstAc.length; i++) {
			itemsObject['for_account'] = this.firstAc[i].id;
			itemsObject['added_by'] = parseInt(localStorage.getItem('user'));
			itemsObject['narration'] = this.narration;
			itemsObject['debit_amount'] = 0;
			itemsObject['credit_amount'] = this.amount[i];
			itemsObject['company'] = parseInt(localStorage.getItem('company'));
			itemsObject['to_Account'] = [this.partyAccount.id];
			itemsObject['date'] = this.voucherDate;
			itemsArray.push(itemsObject);
		}
		salesObject['party_name'] = this.partyAccount.id;
		salesObject['date'] = this.voucherDate;
		salesObject['payment_method'] = this.paymentType;
		salesObject['total_amount'] = this.totalAmount;
		salesObject['narration'] = this.narration;
		salesObject['company'] = parseInt(localStorage.getItem('company'));
		salesObject['added_by'] = parseInt(localStorage.getItem('user'));
		dataObject['sales'] = salesObject;
		dataObject['items'] = itemsArray;
		let data = JSON.stringify(dataObject);
		this.voucherService.addSales(data)
			.subscribe(
			Voucher => {
				this.vouchers.push(Voucher);
				this.salesResponse.next(Voucher);
				this.snackbar.open('Added ' + this.rows.length + " Items in Sales", 'X')
				this.error = '';
			},
			Error => {
				let error = Error.replace(/["{}\[\]]/g, '');
				error = error.replace(/[\:]/g, ' ');
				error = error.replace(/400 - Bad Request/i, ' ');
				this.responseError = error;
			}
			);
	}

	ngOnChanges(changes: SimpleChange) { }

	public constructor(public snackbar: MdSnackBar, private voucherService: VoucherService) {

	}

}

