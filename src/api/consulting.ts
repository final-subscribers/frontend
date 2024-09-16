// import { BASE_URL } from '@/lib/constants';

import axios from 'axios';

export const fetchSidebarData = async (propertyId: number) => {
  const response = await axios.get(`/api/admin/properties/${propertyId}/consultations/sidebar`);
  console.log('Fetched sidebar data:', response.data); // Debug log
  return response.data;
};

export const fetchPendingConsultations = async ({
  queryKey,
}: {
  queryKey: [
    string,
    { propertyId: number; search: string; consultant: string; preferredAt: Date | undefined; page: number },
  ];
}) => {
  const [_key, { propertyId, search, consultant, preferredAt, page }] = queryKey;
  const { data } = await axios.get(`/api/admin/properties/${propertyId}/consultations/pending`, {
    params: {
      search,
      consultant,
      preferred_at: preferredAt,
      page,
      size: 5,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

export const fetchCompletedConsultations = async ({
  queryKey,
}: {
  queryKey: [
    string,
    {
      propertyId: number;
      search: string;
      tier: string;
      consultant: string;
      preferredAt: Date | undefined;
      page: number;
    },
  ];
}) => {
  const [_key, { propertyId, search, tier, consultant, preferredAt, page }] = queryKey;
  const { data } = await axios.get(`/api/admin/properties/${propertyId}/consultations/completed`, {
    params: {
      search,
      tier,
      consultant,
      preferred_at: preferredAt,
      page,
      size: 5,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};
