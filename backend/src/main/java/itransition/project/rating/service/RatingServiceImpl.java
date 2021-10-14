package itransition.project.rating.service;

import itransition.project.rating.dto.RatingDto;
import itransition.project.rating.model.Rating;
import itransition.project.rating.repository.RatingRepository;
import itransition.project.task.dto.TaskDto;
import itransition.project.task.model.Task;
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
public class RatingServiceImpl implements RatingService {

    private final ModelMapper modelMapper;
    private final RatingRepository ratingRepository;

    @Autowired
    public RatingServiceImpl(ModelMapper modelMapper, RatingRepository ratingRepository) {
        this.modelMapper = modelMapper;
        this.ratingRepository = ratingRepository;
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);  //??
    }

    @Override
    @Transactional
    public RatingDto addRating(RatingDto ratingDto) {
        UserDto userDto = ratingDto.getUser();
        TaskDto taskDto = ratingDto.getTask();
        User user = modelMapper.map(userDto,User.class);
        Task task = modelMapper.map(taskDto,Task.class);
        Rating rating = modelMapper.map(ratingDto,Rating.class);
        rating.setUser(user);   //вроде эти строчки не нужны
        rating.setTask(task);
        Optional<Rating> optionalRating = ratingRepository.findByUserAndTask(user,task);
        Rating savedRating = new Rating();
        if(optionalRating.isPresent()){
            rating.setId(optionalRating.get().getId());
            ratingRepository.save(rating);
        } else {
            savedRating=ratingRepository.save(rating);
        }
        RatingDto savedRatingDto =modelMapper.map(savedRating,RatingDto.class);
        savedRatingDto.setTask(taskDto);
        savedRatingDto.setUser(userDto);
        return savedRatingDto;
    }

    @Override
    @Transactional
    public double calculateRating(TaskDto taskDto) {
        Task task = modelMapper.map(taskDto,Task.class);


        Integer count = ratingRepository.countAllByTask(task);


        if(count!=null && count!=0) {
            return ratingRepository.calculateRating(task);
        }
        else{
            return 0;
        }

    }
}
