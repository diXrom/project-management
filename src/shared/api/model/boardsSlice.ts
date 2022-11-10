import { managerAPI } from 'shared/api';
import { IBoard, IBoardId, IIds, IUserId } from '../lib/types';
import { API_PATH, TAGS } from './constants';

export const extendedApiSlice = managerAPI.injectEndpoints({
  endpoints: (build) => ({
    getBoardsSetIds: build.query<IBoard[], IIds>({
      query: (params) => ({ url: API_PATH.BOARDSSET, params }),
      providesTags: (result) =>
        result
          ? [TAGS.BOARDS, ...result.map(({ _id }) => ({ type: TAGS.BOARDS, id: _id }))]
          : [TAGS.BOARDS],
    }),
    getBoardsSetId: build.query<IBoard[], IUserId>({
      query: ({ userId }) => `${API_PATH.BOARDSSET}/${userId}`,
      providesTags: (_, __, arg) => [{ type: TAGS.BOARDS, id: arg.userId }],
    }),
    getBoards: build.query<IBoard[], void>({
      query: () => API_PATH.BOARDS,
      providesTags: (result) =>
        result
          ? [TAGS.BOARDS, ...result.map(({ _id }) => ({ type: TAGS.BOARDS, id: _id }))]
          : [TAGS.BOARDS],
    }),
    getBoard: build.query<IBoard, IBoardId>({
      query: ({ boardId }) => `${API_PATH.BOARDS}/${boardId}`,
      providesTags: (_, __, arg) => [{ type: TAGS.BOARDS, id: arg.boardId }],
    }),
    addBoard: build.mutation<IBoard, Omit<IBoard, '_id'>>({
      query: (body) => ({ url: API_PATH.BOARDS, method: 'POST', body }),
      invalidatesTags: [TAGS.BOARDS],
    }),
    updateBoard: build.mutation<IBoard, IBoard>({
      query: ({ _id, ...body }) => ({
        url: `${API_PATH.BOARDS}/${_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, __, arg) => [{ type: TAGS.BOARDS, id: arg._id }],
    }),
    deleteBoard: build.mutation<IBoard, IBoardId>({
      query: ({ boardId }) => ({ url: `${API_PATH.BOARDS}/${boardId}`, method: 'DELETE' }),
      invalidatesTags: (_, __, arg) => [{ type: TAGS.BOARDS, id: arg.boardId }],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useGetBoardQuery,
  useGetBoardsSetIdsQuery,
  useGetBoardsSetIdQuery,
  useAddBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = extendedApiSlice;
