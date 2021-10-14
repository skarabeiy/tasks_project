import {User} from "../user/user";

export interface Task {
  id: number;
  user: User;
  taskName: string;
  taskCondition: string;
  taskTopic: string;
  tags: string;
  answerOptions: string;
  rating: number;
  rightSolution: string;

}
