import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SupabaseService } from '../../../core/services/supabase.service';

@Component({
  selector: 'app-submit-call',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './submit-call.component.html',
  styleUrls: ['./submit-call.component.scss']
})
export class SubmitCallComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    abstract: new FormControl(''),
    event_type: new FormControl('remote', [Validators.required])
  });

  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private supabase: SupabaseService) {}

  async submit() {
    this.successMessage = '';
    this.errorMessage = '';
    if (this.form.invalid) {
      this.errorMessage = 'Please fix the errors in the form.';
      return;
    }
    this.loading = true;
    const payload = { ...this.form.value } as any;
    payload.status = 'pending';
    const res = await this.supabase.addSubmission(payload);
    this.loading = false;
    if (res.error) {
      this.errorMessage = 'Submission failed. Please try again later.';
      return;
    }
    this.successMessage = 'Submission received! Thank you — we will review it soon.';
    this.form.reset({ event_type: 'remote' });
  }
}
