package itransition.project.rating.repository;

import itransition.project.rating.model.Rating;
import itransition.project.task.model.Task;
import itransition.project.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
 Optional<Rating> findByUserAndTask(User user, Task task);
 Integer countAllByTask(Task task);
 @Query("SELECT avg(r.rating) from Rating r where r.task= ?1")  //
 Double calculateRating(Task task);

 @Query("SELECT new itransition.project.rating.repository.TaskWithBestRating(r.task, avg(r.rating)) FROM Rating r GROUP BY r.task ORDER by avg(r.rating) desc ")  //
 List<TaskWithBestRating> bestRating();
}
