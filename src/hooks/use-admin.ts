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
        console.log('🔍 Checking admin for user:', user.id, user.email);
        console.log('🔍 Current auth.uid():', (await supabase.auth.getUser()).data.user?.id);
        
        // Check for admin role without single() to avoid errors
        const { data: adminRoles, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin');

        console.log('📊 Admin roles query result:', { adminRoles, error });
        
        if (error) {
          console.error('❌ Error querying user_roles:', error);
        }

        const isAdminUser = adminRoles && adminRoles.length > 0;
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