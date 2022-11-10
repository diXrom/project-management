import { managerAPI } from 'shared/api';
import { IColumn, IUserId, IIds, IBoardId, IColumnId } from '../lib/types';
import { API_PATH, TAGS } from './constants';

export const extendedApiSlice = managerAPI.injectEndpoints({
  endpoints: (build) => ({
    getColumnsSet: build.query<IColumn[], IIds & IUserId>({
      query: (params) => ({ url: API_PATH.COLUMNSSET, params }),
      providesTags: (result) =>
        result
          ? [TAGS.COLUMNS, ...result.map(({ _id }) => ({ type: TAGS.COLUMNS, id: _id }))]
          : [TAGS.COLUMNS],
    }),
    addColumnsSet: build.mutation<IColumn[], Omit<IColumn, '_id'>[]>({
      query: (body) => ({ url: API_PATH.COLUMNSSET, method: 'POST', body }),
      invalidatesTags: [TAGS.COLUMNS],
    }),
    updateColumnsSet: build.mutation<IColumn[], Omit<IColumn, 'title' | 'boardId'>[]>({
      query: (body) => ({ url: API_PATH.COLUMNSSET, method: 'PATCH', body }),
      invalidatesTags: [TAGS.COLUMNS],
    }),
    getColumns: build.query<IColumn[], IBoardId>({
      query: ({ boardId }) => `${API_PATH.BOARDS}/${boardId}/${API_PATH.COLUMNS}`,
      providesTags: (result) =>
        result
          ? [TAGS.COLUMNS, ...result.map(({ _id }) => ({ type: TAGS.COLUMNS, id: _id }))]
          : [TAGS.COLUMNS],
    }),
    getColumn: build.query<IColumn, IBoardId & IColumnId>({
      query: ({ boardId, columnId }) =>
        `${API_PATH.BOARDS}/${boardId}/${API_PATH.COLUMNS}/${columnId}`,
      providesTags: (_, __, arg) => [{ type: TAGS.COLUMNS, id: arg.columnId }],
    }),
    addColumn: build.mutation<IColumn, Omit<IColumn, '_id'>>({
      query: ({ boardId, ...body }) => ({
        url: `${API_PATH.BOARDS}/${boardId}/${API_PATH.COLUMNS}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAGS.COLUMNS],
    }),
    updateColumn: build.mutation<IColumn, IColumn>({
      query: ({ boardId, _id, ...body }) => ({
        url: `${API_PATH.BOARDS}/${boardId}/${API_PATH.COLUMNS}/${_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, __, arg) => [{ type: TAGS.COLUMNS, id: arg._id }],
    }),
    deleteColumn: build.mutation<IColumn, IBoardId & IColumnId>({
      query: ({ boardId, columnId }) => ({
        url: `${API_PATH.BOARDS}/${boardId}/${API_PATH.COLUMNS}/${columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, arg) => [{ type: TAGS.COLUMNS, id: arg.columnId }],
    }),
  }),
});

export const {
  useGetColumnsQuery,
  useGetColumnQuery,
  useGetColumnsSetQuery,
  useAddColumnMutation,
  useAddColumnsSetMutation,
  useUpdateColumnMutation,
  useUpdateColumnsSetMutation,
  useDeleteColumnMutation,
} = extendedApiSlice;
