package itransition.project.answer.service;

import itransition.project.answer.dto.AnswerDto;
import itransition.project.answer.dto.ResultDto;
import itransition.project.answer.model.Answer;
import itransition.project.answer.repositry.AnswerRepository;
import itransition.project.task.dto.TaskDto;
import itransition.project.task.model.Task;
import itransition.project.task.repository.TaskRepository;
import itransition.project.task.service.TaskService;
import itransition.project.user.dto.UserDto;
import itransition.project.user.model.User;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
public class AnswerServiceImpl implements AnswerService{

    private final ModelMapper modelMapper;
    private final AnswerRepository answerRepository;
    private final TaskService taskService;

    @Autowired
    public AnswerServiceImpl(ModelMapper modelMapper, AnswerRepository answerRepository,TaskService taskService) {
        this.modelMapper = modelMapper;
        this.answerRepository = answerRepository;
        this.taskService = taskService;
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    }

    @Override
    @Transactional
    public ResultDto processAnswer(AnswerDto answerDto) {
        UserDto userDto = answerDto.getUser();
        TaskDto taskDto = answerDto.getTask();
        User user = modelMapper.map(userDto,User.class);
        Task task = modelMapper.map(taskDto,Task.class);

        TaskDto taskDto1 = taskService.findById(task.getId()).get();
        Task task1 = modelMapper.map(taskDto1,Task.class);
        task.setRightSolution(task1.getRightSolution());

        Answer answer = modelMapper.map(answerDto,Answer.class);
        answer.setUser(user);   //вроде эти строчки не нужны
        answer.setTask(task);
        Optional<Answer> optionalAnswer = answerRepository.findByUserAndTask(user,task);
        Answer savedAnswer = new Answer();

        ResultDto resultDto = new ResultDto();
        if(answer.getAnswer().equals(task.getRightSolution())) {
            if (optionalAnswer.isPresent()) {
                answer.setId(optionalAnswer.get().getId());
                answerRepository.save(answer);
            } else {
                savedAnswer = answerRepository.save(answer);
            }

            resultDto.setAnswer(true);
        }
        else{
            resultDto.setAnswer(false);
        }


        return resultDto;
    }
}
