import { managerAPI } from 'shared/api';
import { ITask, IUserId, IIds, IBoardId, IColumnId, ITaskParam } from '../lib/types';
import { API_PATH, TAGS } from './constants';

export const extendedApiSlice = managerAPI.injectEndpoints({
  endpoints: (build) => ({
    getTasksSet: build.query<ITask[], IIds & IUserId & { search: string }>({
      query: (params) => ({ url: API_PATH.TASKSSET, params }),
      providesTags: (result) =>
        result
          ? [TAGS.TASKS, ...result.map(({ _id }) => ({ type: TAGS.TASKS, id: _id }))]
          : [TAGS.TASKS],
    }),
    getTasksSetId: build.query<ITask[], IBoardId>({
      query: ({ boardId }) => `${API_PATH.TASKSSET}/${boardId}`,
      providesTags: (result) =>
        result
          ? [TAGS.TASKS, ...result.map(({ _id }) => ({ type: TAGS.TASKS, id: _id }))]
          : [TAGS.TASKS],
    }),
    updateTasksSet: build.mutation<ITask[], Pick<ITask, '_id' | 'order' | 'columnId'>[]>({
      query: (body) => ({ url: API_PATH.TASKSSET, method: 'PATCH', body }),
      invalidatesTags: [TAGS.TASKS],
    }),
    getTasks: build.query<ITask[], IBoardId & IColumnId>({
      query: ({ boardId, columnId }) =>
        `${API_PATH.BOARDS}/${boardId}/${API_PATH.COLUMNS}/${columnId}/${API_PATH.TASKS}`,
      providesTags: (result) =>
        result
          ? [TAGS.TASKS, ...result.map(({ _id }) => ({ type: TAGS.TASKS, id: _id }))]
          : [TAGS.TASKS],
    }),
    getTask: build.query<ITask, ITaskParam>({
      query: ({ boardId, columnId, taskId }) =>
        `${API_PATH.BOARDS}/${boardId}/${API_PATH.COLUMNS}/${columnId}/${API_PATH.TASKS}/${taskId}`,
      providesTags: (_, __, arg) => [{ type: TAGS.TASKS, id: arg.taskId }],
    }),
    addTask: build.mutation<ITask, Omit<ITask, '_id'>>({
      query: ({ boardId, columnId, ...body }) => ({
        url: `${API_PATH.BOARDS}/${boardId}/${API_PATH.COLUMNS}/${columnId}/${API_PATH.TASKS}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAGS.TASKS],
    }),
    updateTask: build.mutation<ITask, ITask>({
      query: ({ boardId, _id, ...body }) => ({
        url: `${API_PATH.BOARDS}/${boardId}/${API_PATH.COLUMNS}/${body.columnId}/${API_PATH.TASKS}/${_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, __, arg) => [{ type: TAGS.TASKS, id: arg._id }],
    }),
    deleteTask: build.mutation<ITask, ITaskParam>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `${API_PATH.BOARDS}/${boardId}/${API_PATH.COLUMNS}/${columnId}/${API_PATH.TASKS}/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, arg) => [{ type: TAGS.TASKS, id: arg.taskId }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useGetTasksSetQuery,
  useGetTasksSetIdQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useUpdateTasksSetMutation,
  useDeleteTaskMutation,
} = extendedApiSlice;
