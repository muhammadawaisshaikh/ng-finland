import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  loading = false;
  errorMessage = '';

  constructor(private supabase: SupabaseService, private router: Router) {}

  async submit() {
    this.errorMessage = '';
    if (this.form.invalid) {
      this.errorMessage = 'Please enter valid credentials.';
      return;
    }
    this.loading = true;
    const { email, password } = this.form.value as any;
    const res = await this.supabase.signIn(email, password);
    this.loading = false;
    if (res.error) {
      this.errorMessage = res.error.message || 'Login failed';
      return;
    }
    // Navigate to admin area
    this.router.navigate(['/admin/call-for-papers']);
  }
}
