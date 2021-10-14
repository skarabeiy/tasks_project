package itransition.project.task.controller;

import itransition.project.task.dto.TaskDto;
import itransition.project.task.service.TaskService;
import itransition.project.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks/")  //??
@CrossOrigin
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<TaskDto> findTask (@PathVariable("id") long id){
        Optional<TaskDto> optionalTaskDto = taskService.findById(id);
        return  optionalTaskDto
                .map(taskDto -> new ResponseEntity<>(taskDto, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));

    }

    @GetMapping
    public List<TaskDto> findAllTask(){
        return taskService.findAll();
    }

    @GetMapping(value = "all/{userId}")
    public List<TaskDto> findAllTaskByUserId(@PathVariable("userId") long userId){
        return taskService.findAllByUser(userId);
    }

    @GetMapping(value = "lastCreated")
    public List<TaskDto> findLastCreatedTasks(){
        return taskService.findLastCreatedTasks();
    }


    @GetMapping(value = "bestRating")
    public List<TaskDto> findBestRatingTasks(){
        return taskService.findBestRatingTasks();
    }



    @GetMapping(value = "search/{term}")  //
    public List<TaskDto> search (@PathVariable("term") String term){
        return taskService.search(term);
    }

    @PostMapping
    public ResponseEntity<TaskDto> saveTask (@RequestBody TaskDto taskDto){
        TaskDto savedTaskDto= taskService.saveTask(taskDto);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(savedTaskDto.getId()).toUri();

        return ResponseEntity.created(location).build();

    }

    @PutMapping(value = "{id}")
    public ResponseEntity updateTask(@PathVariable("id") long id, @RequestBody TaskDto taskDto){
        taskService.updateTask(taskDto,id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity deleteTask (@PathVariable("id") long id){
        taskService.deleteById(id);
       return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
