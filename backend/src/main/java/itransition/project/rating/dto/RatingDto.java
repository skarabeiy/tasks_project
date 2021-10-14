package itransition.project.rating.dto;

import itransition.project.task.dto.TaskDto;
import itransition.project.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class RatingDto {
    private Long id;
    private UserDto user;
    private TaskDto task;
    private double rating;

}
