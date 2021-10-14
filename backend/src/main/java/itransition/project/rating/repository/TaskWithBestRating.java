package itransition.project.rating.repository;

import itransition.project.task.model.Task;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskWithBestRating {

    private Task task;

    private double rating;
}
