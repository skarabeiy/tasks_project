package itransition.project.user.dto;


import itransition.project.user.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String name;
    private Role role;

    private int numberCreatedTasks;
    private int numberSolvedTasks;
}
