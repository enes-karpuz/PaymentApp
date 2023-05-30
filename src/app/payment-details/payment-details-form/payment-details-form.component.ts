import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styles: []
})
export class PaymentDetailsFormComponent implements OnInit {
  constructor(public service: PaymentDetailService, private toastr: ToastrService) {

  }

  ngOnInit(): void {

    console.log('Program Başlatıldı..');
  }
  onSubmit(form: NgForm) {
    if (this.service.formData.paymentDetailId == 0) {
      this.insertRecord(form);
    }
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Başarıyla Yüklendi');
      },
      err => {
        console.log(err);
      }
    );
    console.log(this.service.formData.cardOwnerName + ' Adlı Kişinin Bilgileri Eklendi..');
  }
  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Başarıyla Güncellendi');
      },
      err => {
        console.log(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new PaymentDetail();
  };

}