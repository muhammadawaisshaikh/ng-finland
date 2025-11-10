import { Component, OnInit, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService, Submission } from '../../../core/services/supabase.service';

@Component({
  selector: 'app-admin-cfp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {
  submissions = signal<Submission[]>([]);
  loading = signal(false);
  filter = signal<'all' | 'pending' | 'approved' | 'rejected'>('all');

  constructor(public supabase: SupabaseService, private router: Router) {}

  ngOnInit(): void {
    // subscribe to BehaviorSubject
    this.supabase.submissions$.subscribe(list => {
      this.submissions.set(list);
      // debug: log updates so missing data can be diagnosed in the browser console
      console.debug('AdminView: submissions updated', list);
    });
    this.supabase.loading$.subscribe(v => {
      this.loading.set(v);
      console.debug('AdminView: loading', v);
    });
    // initial load
    this.supabase.getSubmissions();
  }

  async setStatus(id: string | undefined, status: 'approved' | 'rejected'){
    if (!id) return;
    await this.supabase.updateSubmissionStatus(id, status);
  }

  async logout() {
    await this.supabase.signOut();
    this.router.navigate(['/admin/login']);
  }

  filtered = computed(() => {
    const f = this.filter();
    if (f === 'all') return this.submissions();
    return this.submissions().filter(s => s.status === f);
  });
}
