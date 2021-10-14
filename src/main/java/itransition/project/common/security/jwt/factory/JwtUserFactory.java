package itransition.project.common.security.jwt.factory;

import itransition.project.common.security.jwt.JwtUser;
import itransition.project.user.dto.UserDtoWithPassword;
import itransition.project.user.model.Role;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;

@Slf4j
public final class JwtUserFactory {

    public JwtUserFactory() {
    }

    public static JwtUser create(UserDtoWithPassword user) {
        log.info("start creating user");
        return new JwtUser(
                user.getId(),
                user.getName(),
                user.getPassword(),
                mapToGrantedAuthorities(user.getRole())
        );
    }


    private static List<GrantedAuthority> mapToGrantedAuthorities(Role userRole) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(userRole.getValue()));
        return authorities;
    }
}
