package itransition.project.task.model;


import itransition.project.rating.model.Rating;
import itransition.project.user.model.User;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(cascade=CascadeType.ALL,orphanRemoval=true, mappedBy = "task")
    private List<Rating> ratings = new ArrayList<>();

    @OneToMany(cascade=CascadeType.ALL,orphanRemoval=true, mappedBy = "task")
    private List<Rating> answers = new ArrayList<>();

    @Column(name = "task_name")
    private String taskName;
    @Column(name = "task_condition")
    private String taskCondition;
    @Column(name = "task_topic")
    private String taskTopic;

    private String tags;
    @Column(name = "answer_options")
    private String answerOptions;


    @Column(name = "right_solution")
    private String rightSolution;
}

