import {User} from "../user/user";
import {TaskWithName} from "../task/taskWithName";

export interface Rating {
  id: number;
  user: User;
  task: TaskWithName;
  rating: number;
}
