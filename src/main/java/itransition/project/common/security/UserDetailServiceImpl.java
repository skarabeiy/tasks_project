package itransition.project.common.security;

import itransition.project.common.security.jwt.JwtUser;
import itransition.project.common.security.jwt.factory.JwtUserFactory;
import itransition.project.user.dto.UserDtoWithPassword;
import itransition.project.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
public class UserDetailServiceImpl implements UserDetailsService {

    private final UserService userService;

    @Autowired
    public UserDetailServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        UserDtoWithPassword user = userService.findByName(name);

        if (user == null) {
            throw new UsernameNotFoundException(name);
        }

        JwtUser jwtUser = JwtUserFactory.create(user);
        log.info("IN loadUserByUsername - user with username: {} successfully loaded", name);

        return jwtUser;
    }
}
