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
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

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

  const fetchModels = async (makeId?: string) => {
    try {
      let query = supabase
        .from('models')
        .select('*')
        .order('name');

      if (makeId) {
        query = query.eq('make_id', makeId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setModels(data || []);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  const getModelsByMake = (makeId: string) => {
    return models.filter(model => model.make_id === makeId);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchMakes();
      await fetchModels();
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    makes,
    models,
    loading,
    fetchModels,
    getModelsByMake,
    refreshData: async () => {
      await fetchMakes();
      await fetchModels();
    }
  };
};