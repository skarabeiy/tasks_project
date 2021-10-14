package itransition.project.user.model;


import itransition.project.rating.model.Rating;
import itransition.project.task.model.Task;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor  //мб они не нужн 2?
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @OneToMany(cascade=CascadeType.ALL,orphanRemoval=true, mappedBy = "user") //?
    private List<Task> tasks = new ArrayList<>();

    @OneToMany(cascade=CascadeType.ALL,orphanRemoval=true, mappedBy = "user")
    private List<Rating> ratings = new ArrayList<>();

    @OneToMany(cascade=CascadeType.ALL,orphanRemoval=true, mappedBy = "user")
    private List<Rating> answers = new ArrayList<>();

}