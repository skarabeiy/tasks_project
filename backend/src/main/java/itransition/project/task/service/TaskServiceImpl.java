package itransition.project.task.service;

import itransition.project.rating.repository.RatingRepository;
import itransition.project.rating.repository.TaskWithBestRating;
import itransition.project.rating.service.RatingService;
import itransition.project.task.dto.TaskDto;
import itransition.project.task.model.Task;
import itransition.project.task.repository.TaskRepository;
import itransition.project.user.model.User;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class TaskServiceImpl implements TaskService {

    private final ModelMapper modelMapper;
    private final TaskRepository taskRepository;
    private final RatingService ratingService;
    private final RatingRepository ratingRepository;


    @Autowired
    public TaskServiceImpl(ModelMapper modelMapper, TaskRepository taskRepository, RatingService ratingService, RatingRepository ratingRepository) {
        this.modelMapper = modelMapper;
        this.taskRepository = taskRepository;
        this.ratingService = ratingService;
        this.ratingRepository = ratingRepository;
    }


    @Override
    @Transactional
    public Optional<TaskDto> findById(Long id) {
        log.info("In TaskServiceImpl findById {}", id);
        Optional<Task> optionalTask = taskRepository.findById(id);
        Optional<TaskDto> optionalTaskDto = optionalTask.map(task -> modelMapper.map(task, TaskDto.class));
        if(optionalTaskDto.isPresent()) {
            TaskDto taskDto = optionalTaskDto.get();
            taskDto.setRating(ratingService.calculateRating(taskDto));
            return Optional.of(taskDto);
        }
        return optionalTaskDto;
    }

    @Override
    @Transactional
    public List<TaskDto> findAll() {
        log.info("In TaskServiceImpl findAll");
        List<Task> tasks = taskRepository.findAll();
        List<TaskDto> taskDtos = tasks.stream().map(task -> modelMapper.map(task, TaskDto.class)).collect(Collectors.toList());
        for (TaskDto taskDto : taskDtos) {
            taskDto.setRating(ratingService.calculateRating(taskDto));
        }
        return taskDtos;
    }

    @Override
    @Transactional
    public List<TaskDto> findAllByUser(Long userId) {
        log.info("In TaskServiceImpl findAllByUser");
        User user = new User();
        user.setId(userId);
        List<Task> tasks = taskRepository.findAllByUser(user);
        List<TaskDto> taskDtos = tasks.stream().map(task -> modelMapper.map(task, TaskDto.class)).collect(Collectors.toList());

        for (TaskDto taskDto : taskDtos) {
            taskDto.setRating(ratingService.calculateRating(taskDto));
        }
        return taskDtos;
    }

    @Override
    @Transactional
    public List<TaskDto> findLastCreatedTasks() {
        log.info("In TaskServiceImpl findLastCreatedTasks");
        List<Task> tasks = taskRepository.findAllByOrderByIdDesc();
        List<TaskDto> taskDtos = tasks.stream().map(task -> modelMapper.map(task, TaskDto.class)).collect(Collectors.toList());
        for (TaskDto taskDto : taskDtos) {
            taskDto.setRating(ratingService.calculateRating(taskDto));
        }
        return taskDtos;
    }


    @Override
    @Transactional
    public List<TaskDto> findBestRatingTasks() {
        log.info("In TaskServiceImpl findBestRatingTasks");
        List<TaskWithBestRating> taskWithBestRatings = ratingRepository.bestRating();


        List<TaskDto> taskDtos = taskWithBestRatings.stream().map(task ->{
                    TaskDto taskDto = modelMapper.map(task.getTask(),TaskDto.class);
           taskDto.setRating(task.getRating());
           return taskDto;
        }
        ).collect(Collectors.toList());

        return taskDtos;
    }



    @Override
    @Transactional
    public List<TaskDto> search(String term) {
        log.info("In TaskServiceImpl search");
        List<Task> tasks = taskRepository.findAll();

        List<TaskDto> taskDtos= new ArrayList<>();
        for (Task task: tasks){
            String box ="";
            TaskDto taskDto = modelMapper.map(task,TaskDto.class);
            box = box + taskDto.getTaskName() + taskDto.getTaskCondition() + taskDto.getTaskTopic() + taskDto.getTags() + taskDto.getAnswerOptions();

            if(box.contains(term)){
                taskDtos.add(taskDto);
            }

        }
        return taskDtos;

    }


    @Override
    @Transactional
    public TaskDto saveTask(TaskDto taskDto) {
        log.info("In TaskServiceImpl saveTask {}",taskDto);
        Task task = modelMapper.map(taskDto,Task.class);
        Task savedTask = taskRepository.save(task);
        return modelMapper.map(savedTask, TaskDto.class);
    }

    @Override
    @Transactional
    public void updateTask(TaskDto taskDto, Long id) {
    log.info("In TaskServiceImpl updateTask {}",taskDto);
    taskDto.setId(id);
    Task task = modelMapper.map(taskDto,Task.class);
    taskRepository.save(task);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
    log.info("In TaskServiceImpl deleteById {}",id);
    taskRepository.deleteById(id);
    }
}
