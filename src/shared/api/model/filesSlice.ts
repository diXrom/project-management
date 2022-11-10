import { managerAPI } from 'shared/api';
import { IUserId, IFile, IIds, ITaskId, IBoardId, IFileId } from '../lib/types';
import { API_PATH, TAGS } from './constants';

export const extendedApiSlice = managerAPI.injectEndpoints({
  endpoints: (build) => ({
    getFiles: build.query<IFile[], IIds & IUserId & ITaskId>({
      query: (params) => ({ url: API_PATH.FILE, params }),
      providesTags: (result) =>
        result
          ? [TAGS.FILE, ...result.map(({ _id }) => ({ type: TAGS.FILE, id: _id }))]
          : [TAGS.FILE],
    }),
    getFilesId: build.query<IFile[], IBoardId>({
      query: ({ boardId }) => `${API_PATH.FILE}/${boardId}`,
      providesTags: (result) =>
        result
          ? [TAGS.FILE, ...result.map(({ _id }) => ({ type: TAGS.FILE, id: _id }))]
          : [TAGS.FILE],
    }),
    addFile: build.mutation<IFile, FormData>({
      query: (body) => ({
        url: `${API_PATH.FILE}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAGS.FILE],
    }),
    deleteFile: build.mutation<IFile, IFileId>({
      query: ({ fileId }) => ({ url: `${API_PATH.FILE}/${fileId}`, method: 'DELETE' }),
      invalidatesTags: (_, __, arg) => [{ type: TAGS.FILE, id: arg.fileId }],
    }),
  }),
});

export const { useGetFilesQuery, useGetFilesIdQuery, useAddFileMutation, useDeleteFileMutation } =
  extendedApiSlice;
