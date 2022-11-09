interface IAuth {
  name: string;
  login: string;
  password: string;
}

interface IUser {
  _id: string;
  name: string;
  login: string;
}

interface IBoard {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

interface IColumn {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

interface ITask {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

interface IFile {
  _id: string;
  name: string;
  taskId: string;
  boardId: string;
  path: string;
}

interface IPoint {
  _id: string;
  title: string;
  taskId: string;
  boardId: string;
  done: boolean;
}

interface IStorageAuth {
  token: string;
  name: string;
  tokenLifetime: number;
}

type IToken = { token: string };

type IIds = { ids: string[] };

type IUserId = { userId: string };

type IBoardId = { boardId: string };

type IColumnId = { columnId: string };

type ITaskId = { taskId: string };

type IFileId = { fileId: string };

type IPointId = { pointId: string };

type ITaskParam = IBoardId & IColumnId & ITaskId;

export type {
  IAuth,
  IUser,
  IBoard,
  IColumn,
  ITask,
  IFile,
  IIds,
  IToken,
  IUserId,
  IBoardId,
  IColumnId,
  ITaskId,
  ITaskParam,
  IFileId,
  IPoint,
  IPointId,
  IStorageAuth,
};
