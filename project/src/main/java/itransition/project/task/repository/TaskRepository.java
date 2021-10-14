package itransition.project.task.repository;

import itransition.project.task.model.Task;
import itransition.project.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    int countAllByUser(User user);
    List<Task> findAllByUser(User user);
    List<Task> findAllByOrderByIdDesc();

}
