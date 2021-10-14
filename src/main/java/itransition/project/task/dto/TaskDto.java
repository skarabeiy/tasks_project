package itransition.project.task.dto;

import itransition.project.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {
    private Long id;
    private UserDto user;
    private String taskName;
    private String taskCondition;
    private String taskTopic;
    private String tags;
    private String answerOptions;
    private double rating;

    private String rightSolution;
}
