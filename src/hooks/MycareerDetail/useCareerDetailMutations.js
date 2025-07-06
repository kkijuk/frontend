// hooks/MycareerDetail/useCareerDetailMutations.js
import { useMutation } from '@tanstack/react-query';
import { CareerDetailEdit, CareerDetailDelete } from '@/api/Mycareer/CareerDetailEdit';
import { AddDetail } from '@/api/Mycareer/AddDetail';

export const useCareerDetailAdd = (onSuccess) =>
  useMutation({
    mutationFn: ({ careerId, data }) => AddDetail(careerId, data),
    onSuccess,
  });


export const useCareerDetailEdit = (onSuccess) =>
  useMutation({
    mutationFn: ({ careerId, detailId, data }) => CareerDetailEdit(careerId, detailId, data),
    onSuccess,
  });

export const useCareerDetailDelete = (onSuccess) =>
  useMutation({
    mutationFn: ({ careerId, detailId }) => CareerDetailDelete(careerId, detailId),
    onSuccess,
  });

  