package itransition.project.task.service;

import itransition.project.task.dto.TaskDto;



import java.util.List;
import java.util.Optional;

public interface TaskService {
    Optional<TaskDto> findById(Long id);

    List<TaskDto> findAll();

    List<TaskDto> findAllByUser(Long userId);

    List<TaskDto> findLastCreatedTasks();

    List<TaskDto> findBestRatingTasks();

    List<TaskDto> search(String term);

    TaskDto saveTask(TaskDto taskDto);

    void updateTask(TaskDto taskDto, Long id);

    void deleteById(Long id);

}
