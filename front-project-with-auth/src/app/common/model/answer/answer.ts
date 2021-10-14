import {User} from "../user/user";
import {TaskWithName} from "../task/taskWithName";


export interface Answer {
  id: number;
  user: User;
  task: TaskWithName;
  answer: string;
}
