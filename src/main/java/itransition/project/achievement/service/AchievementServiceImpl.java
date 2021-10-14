package itransition.project.achievement.service;


import itransition.project.answer.repositry.AnswerRepository;
import itransition.project.task.repository.TaskRepository;
import itransition.project.user.dto.UserDto;
import itransition.project.user.model.User;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
public class AchievementServiceImpl implements AchievementService {
    private final ModelMapper modelMapper;
    private final TaskRepository taskRepository;
    private final AnswerRepository answerRepository;

    @Autowired
    public AchievementServiceImpl(ModelMapper modelMapper, TaskRepository taskRepository, AnswerRepository answerRepository) {
        this.modelMapper = modelMapper;
        this.taskRepository = taskRepository;
        this.answerRepository = answerRepository;
    }


    @Override
    @Transactional
    public UserDto processAchievement(Long id) {
        UserDto userDto = new UserDto();
        userDto.setId(id);
        User user = modelMapper.map(userDto,User.class);
        userDto.setNumberCreatedTasks(taskRepository.countAllByUser(user));
        userDto.setNumberSolvedTasks(answerRepository.countAllByUser(user));
        return userDto;
    }
}

