import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Make {
  id: string;
  name: string;
}

export interface Model {
  id: string;
  make_id: string;
  name: string;
}


export const useMakesAndModels = () => {
  const [makes, setMakes] = useState<Make[]>([]);
  const [modelsByMake, setModelsByMake] = useState<Record<string, Model[]>>({});
  const [loading, setLoading] = useState(true);
  const [loadingModels, setLoadingModels] = useState<Record<string, boolean>>({});

  const fetchMakes = async () => {
    try {
      const { data, error } = await supabase
        .from('makes')
        .select('*')
        .order('name');

      if (error) throw error;
      setMakes(data || []);
    } catch (error) {
      console.error('Error fetching makes:', error);
    }
  };

  const fetchModelsForMake = async (makeId: string) => {
    // Return early if already loaded or loading
    if (modelsByMake[makeId] || loadingModels[makeId]) {
      return modelsByMake[makeId] || [];
    }

    setLoadingModels(prev => ({ ...prev, [makeId]: true }));

    try {
      const { data, error } = await supabase
        .from('models')
        .select('*')
        .eq('make_id', makeId)
        .order('name');

      if (error) throw error;
      
      const models = data || [];
      setModelsByMake(prev => ({ ...prev, [makeId]: models }));
      setLoadingModels(prev => ({ ...prev, [makeId]: false }));
      
      return models;
    } catch (error) {
      console.error('Error fetching models:', error);
      setLoadingModels(prev => ({ ...prev, [makeId]: false }));
      return [];
    }
  };

  const getModelsByMake = (makeId: string) => {
    return modelsByMake[makeId] || [];
  };

  const isLoadingModelsForMake = (makeId: string) => {
    return loadingModels[makeId] || false;
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchMakes();
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    makes,
    loading,
    fetchModelsForMake,
    getModelsByMake,
    isLoadingModelsForMake,
    refreshData: async () => {
      setModelsByMake({});
      setLoadingModels({});
      await fetchMakes();
    }
  };
};