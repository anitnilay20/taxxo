import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Company,Ledgers,Contra,Payment,Receipt } from '../model';
import {CalendarModule} from 'primeng/primeng';
import { ReactiveFormsModule,FormBuilder, Validators } from '@angular/forms';
import {MdSnackBar} from '@angular/material';
import { LedgersService } from '../ledgers/ledgers.service';


@Component({
  selector: 'vouchers',
  templateUrl: 'vouchers.component.html',
  providers: [LedgersService]
})

export class VouchersComponent implements OnInit {
    ledgers:Ledgers[];
    firstAc:number;
    secondAc:number;
    amount:number;
    selectedCompany = localStorage.getItem('companyName');
    ngOnInit(){
        this.titleService.setTitle("Your Dashboard || Vouchers");
        this.getLedgers();
    }

    changeFirstAc(event:string){
        this.firstAc = event['value'];
    }
    changeSecondAc(event:string){
        this.secondAc = event['value'];
    }

    getLedgers(){
        this.LedgersService.getLedgers()
        .subscribe(
        ledgers => {this.ledgers = ledgers;console.log(this.ledgers);},
        error => {console.log(error)}
        );
    }
    public constructor(private titleService: Title, private LedgersService:LedgersService,public snackbar:MdSnackBar,public fb: FormBuilder) { }
}
