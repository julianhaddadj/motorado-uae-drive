import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';

export function useAdmin() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      console.log('🔍 Checking admin role for user:', user?.id, user?.email);
      
      if (!user) {
        console.log('❌ No user found, setting isAdmin to false');
        setIsAdmin(false);
        setAdminLoading(false);
        return;
      }

      try {
        console.log('🔍 Querying user_roles table for user:', user.id);
        
        // First, let's check ALL roles for this user
        const { data: allRoles, error: allRolesError } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', user.id);
        
        console.log('📊 All roles for user:', { allRoles, allRolesError });
        
        // Then check specifically for admin role
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .single();

        console.log('📊 Admin query result:', { data, error });

        if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
          console.error('❌ Error checking admin role:', error);
        }

        const isAdminUser = !!data;
        console.log('✅ Setting isAdmin to:', isAdminUser);
        setIsAdmin(isAdminUser);
      } catch (error) {
        console.error('❌ Exception checking admin role:', error);
        setIsAdmin(false);
      }

      setAdminLoading(false);
    };

    if (!loading) {
      console.log('🚀 Auth loading complete, checking admin role...');
      checkAdminRole();
    }
  }, [user, loading]);

  return {
    isAdmin,
    adminLoading: loading || adminLoading
  };
}