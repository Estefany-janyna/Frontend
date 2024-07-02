// import { Validators } from '@angular/forms';
// // import { AuthService } from './../../../services/auth.service';
// import { DataLoginService } from 'src/app/services/data-login.service';
// import { Component, inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';

// @Component({
//   selector: 'app-forget-password',
//   templateUrl: './forget-password.component.html',
//   styleUrls: ['./forget-password.component.css']
// })
// export class ForgetPasswordComponent implements OnInit {
//   forgetForm!: FormGroup;
//   fb = inject(FormBuilder);
//   dataLoginService = inject(DataLoginService);

//   ngOnInit(): void{
//     this.forgetForm = this.fb.group({
//       email:['', Validators.compose([Validators.required, Validators.email])]
//     })
//   } 
//   submit(){
//     this.dataLoginService.sendEmailService(this.forgetForm.value).subscribe({
//       next: (res)=>{
//         alert(res.message);
//         this.forgetForm.reset();
//       },
//       error:(err)=>{
//          alert(err.error.message)   
//       }
//     })
//   }

// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLoginService } from 'src/app/services/data-login.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm!: FormGroup;

  constructor(private fb: FormBuilder, private dataLoginService: DataLoginService) {}

  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  } 

  submit() {
    if (this.forgetForm.invalid) {
      return;
    }
    this.dataLoginService.sendEmailService(this.forgetForm.value).subscribe({
      next: (res) => {
        alert(res.message);
        this.forgetForm.reset();
      },
      error: (err) => {
        alert(err.error.message);
      }
    });
  }
}

