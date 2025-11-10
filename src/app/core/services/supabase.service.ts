import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

export type Submission = {
  id?: string;
  name: string;
  email: string;
  title: string;
  abstract?: string;
  event_type?: 'remote' | 'onsite';
  status?: 'pending' | 'approved' | 'rejected';
  created_at?: string;
};

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;
  public submissions$ = new BehaviorSubject<Submission[]>([]);
  public loading$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    // initial load
    this.getSubmissions();
    // listen for realtime changes and refresh the list
    try {
      // Realtime subscription (optional). Falls back silently if not available.
      this.supabase
        .channel('public:submissions')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'submissions' }, () => {
          this.getSubmissions();
        })
        .subscribe();
    } catch (e) {
      // ignore realtime subscription errors; manual refresh still works
      // console.warn('Realtime not initialized', e);
    }
  }

  async getSubmissions(): Promise<Submission[] | null> {
    this.loading$.next(true);
    const { data, error } = await this.supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });
    this.loading$.next(false);
    if (error) {
      console.error('Error fetching submissions', error);
      return null;
    }
    this.submissions$.next(data ?? []);
    return data ?? [];
  }

  // Auth helpers
  async signIn(email: string, password: string) {
    this.loading$.next(true);
    const res = await this.supabase.auth.signInWithPassword({ email, password });
    this.loading$.next(false);
    if (res.error) {
      console.error('Auth signIn error', res.error);
      return { user: null, error: res.error };
    }
    return { user: res.data.user, error: null };
  }

  async signOut() {
    this.loading$.next(true);
    const res = await this.supabase.auth.signOut();
    this.loading$.next(false);
    if (res.error) {
      console.error('Auth signOut error', res.error);
      return { error: res.error };
    }
    return { error: null };
  }

  async getSession() {
    const res = await this.supabase.auth.getSession();
    return res.data.session;
  }

  async addSubmission(payload: Submission): Promise<{ data: Submission | null; error: any }>{
    this.loading$.next(true);
    const { data, error } = await this.supabase
      .from('submissions')
      .insert([payload])
      .select()
      .single();
    this.loading$.next(false);
    if (error) {
      console.error('Error inserting submission', error);
      return { data: null, error };
    }
    // optimistically refresh
    this.getSubmissions();
    return { data, error: null };
  }

  async updateSubmissionStatus(id: string, status: 'pending' | 'approved' | 'rejected'){
    this.loading$.next(true);
    const { data, error } = await this.supabase
      .from('submissions')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    this.loading$.next(false);
    if (error) {
      console.error('Error updating status', error);
      return { data: null, error };
    }
    // Update local subject (simple approach)
    const current = this.submissions$.value.map(s => s.id === id ? { ...s, status } : s);
    this.submissions$.next(current as Submission[]);
    return { data, error: null };
  }
}
