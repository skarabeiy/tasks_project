package itransition.project.user.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationUserDto {

    private String name;
    private String password;
}
