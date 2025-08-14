import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Clear redirect flag when signing out
        if (event === 'SIGNED_OUT') {
          sessionStorage.removeItem('admin_redirected');
        }
        
        // Auto-redirect admin users to admin dashboard
        if (event === 'SIGNED_IN' && 
            session?.user?.email === 'julian_102030@hotmail.com' && 
            !window.location.pathname.includes('/admin')) {
          console.log('🚀 Admin user detected, redirecting to admin dashboard');
          setTimeout(() => {
            window.location.href = '/admin';
          }, 500);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Also check for admin redirect on initial load
      if (session?.user?.email === 'julian_102030@hotmail.com' && 
          !window.location.pathname.includes('/admin')) {
        console.log('🚀 Admin user already signed in, redirecting to admin dashboard');
        setTimeout(() => {
          window.location.href = '/admin';
        }, 500);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          display_name: displayName
        }
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const signOut = async () => {
    // Clear redirect flag on sign out
    sessionStorage.removeItem('admin_redirected');
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut
  };
}