export interface Task{
  id: number;
  tittle: string;
  completed: boolean;
  editing?: boolean;//Para saber que tarea esta en modo de edición
};
