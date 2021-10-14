package itransition.project.answer.repositry;

import itransition.project.answer.model.Answer;
import itransition.project.task.model.Task;
import itransition.project.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Long> {
    Optional<Answer> findByUserAndTask(User user, Task task);
    int countAllByUser(User user);
}
