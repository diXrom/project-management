import { managerAPI } from 'shared/api';
import { IUserId, IIds, ITaskId, IPointId, IPoint } from '../lib/types';
import { API_PATH, TAGS } from './constants';

export const extendedApiSlice = managerAPI.injectEndpoints({
  endpoints: (build) => ({
    getPointsId: build.query<IPoint[], ITaskId>({
      query: ({ taskId }) => `${API_PATH.POINTS}/${taskId}`,
      providesTags: (result) =>
        result
          ? [TAGS.POINTS, ...result.map(({ _id }) => ({ type: TAGS.POINTS, id: _id }))]
          : [TAGS.POINTS],
    }),
    getPoints: build.query<IPoint[], IIds & IUserId>({
      query: (params) => ({ url: API_PATH.POINTS, params }),
      providesTags: (result) =>
        result
          ? [TAGS.POINTS, ...result.map(({ _id }) => ({ type: TAGS.POINTS, id: _id }))]
          : [TAGS.POINTS],
    }),
    //Swagger пишет что ответ является не массивом что странно
    updatePoints: build.mutation<IPoint[], Pick<IPoint, '_id' | 'done'>[]>({
      query: (body) => ({
        url: `${API_PATH.POINTS}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAGS.POINTS],
    }),
    addPoint: build.mutation<IPoint, Omit<IPoint, '_id'>>({
      query: (body) => ({
        url: `${API_PATH.POINTS}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAGS.POINTS],
    }),
    updatePoint: build.mutation<Partial<IPoint>, Omit<IPoint, 'taskId' | 'boardId'>>({
      query: ({ _id, ...body }) => ({
        url: `${API_PATH.POINTS}/${_id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_, __, arg) => [{ type: TAGS.POINTS, id: arg._id }],
    }),
    deletePoints: build.mutation<IPoint, IPointId>({
      query: ({ pointId }) => ({ url: `${API_PATH.POINTS}/${pointId}`, method: 'DELETE' }),
      invalidatesTags: (_, __, arg) => [{ type: TAGS.POINTS, id: arg.pointId }],
    }),
  }),
});

export const {
  useGetPointsQuery,
  useGetPointsIdQuery,
  useAddPointMutation,
  useUpdatePointMutation,
  useUpdatePointsMutation,
  useDeletePointsMutation,
} = extendedApiSlice;
