import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: []
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }
  populateForm(selectorRecord: PaymentDetail) {
    this.service.formData = Object.assign({}, selectorRecord);
  }
  onDelete(id:number) {
    if (confirm('Silinmek İstediğinize Emin Misiniz?')) {
      this.service.deletePaymentDetail(id).subscribe(
        res => {
          console.log('miyv');
          
          this.service.refreshList();
          this.toastr.error("Başarıyla Silindi", 'Patment Detail Register');
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
