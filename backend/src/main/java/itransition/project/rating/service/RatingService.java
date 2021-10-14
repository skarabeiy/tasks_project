package itransition.project.rating.service;


import itransition.project.rating.dto.RatingDto;
import itransition.project.task.dto.TaskDto;

public interface RatingService {
    RatingDto addRating(RatingDto ratingDto);

    double calculateRating(TaskDto taskDto);



}
