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

export interface Trim {
  id: string;
  model_id: string;
  name: string;
}


export const useMakesAndModels = () => {
  const [makes, setMakes] = useState<Make[]>([]);
  const [modelsByMake, setModelsByMake] = useState<Record<string, Model[]>>({});
  const [trimsByModel, setTrimsByModel] = useState<Record<string, Trim[]>>({});
  const [loading, setLoading] = useState(true);
  const [loadingModels, setLoadingModels] = useState<Record<string, boolean>>({});
  const [loadingTrims, setLoadingTrims] = useState<Record<string, boolean>>({});

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

  const fetchTrimsForModel = async (modelId: string) => {
    // Return early if already loaded or loading
    if (trimsByModel[modelId] || loadingTrims[modelId]) {
      return trimsByModel[modelId] || [];
    }

    setLoadingTrims(prev => ({ ...prev, [modelId]: true }));

    try {
      const { data, error } = await supabase
        .from('trims')
        .select('*')
        .eq('model_id', modelId)
        .order('name');

      if (error) throw error;
      
      const trims = data || [];
      setTrimsByModel(prev => ({ ...prev, [modelId]: trims }));
      setLoadingTrims(prev => ({ ...prev, [modelId]: false }));
      
      return trims;
    } catch (error) {
      console.error('Error fetching trims:', error);
      setLoadingTrims(prev => ({ ...prev, [modelId]: false }));
      return [];
    }
  };

  const getTrimsByModel = (modelId: string) => {
    return trimsByModel[modelId] || [];
  };

  const isLoadingModelsForMake = (makeId: string) => {
    return loadingModels[makeId] || false;
  };

  const isLoadingTrimsForModel = (modelId: string) => {
    return loadingTrims[modelId] || false;
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
    fetchTrimsForModel,
    getTrimsByModel,
    isLoadingTrimsForModel,
    refreshData: async () => {
      setModelsByMake({});
      setTrimsByModel({});
      setLoadingModels({});
      setLoadingTrims({});
      await fetchMakes();
    }
  };
};