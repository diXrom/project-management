const API_URL = 'https://whispering-beyond-30793.herokuapp.com/';

const API_PATH = {
  LOGIN: 'auth/signin',
  REGISTER: 'auth/signup',
  USERS: 'users',
  BOARDS: 'boards',
  BOARDSSET: 'boardsSet',
  COLUMNS: 'columns',
  COLUMNSSET: 'columnsSet',
  TASKS: 'tasks',
  TASKSSET: 'tasksSet',
  FILE: 'file',
  POINTS: 'points',
};

const TAGS = {
  USERS: 'Users',
  BOARDS: 'Boards',
  COLUMNS: 'Columns',
  TASKS: 'Tasks',
  FILE: 'File',
  POINTS: 'Points',
};

export { API_URL, API_PATH, TAGS };
