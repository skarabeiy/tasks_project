package itransition.project.user.dto;

import itransition.project.user.model.Role;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDtoWithPassword {
    private Long id;
    private String name;
    private Role role;
    private String password;

}
