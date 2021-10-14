package itransition.project.user.controller;

import itransition.project.common.security.jwt.provider.JwtTokenProvider;
import itransition.project.user.dto.AuthenticationUserDto;
import itransition.project.user.dto.UserDtoWithPassword;
import itransition.project.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/auth/")
@CrossOrigin
public class AuthenticationController {


    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    private final UserService userService;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }

    @PostMapping("login")
    public ResponseEntity login(@RequestBody AuthenticationUserDto userDto) {
        try {
            String name = userDto.getName();
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(name, userDto.getPassword()));
            UserDtoWithPassword user = userService.findByName(name);

            if (user == null) {
                throw new UsernameNotFoundException("User with username: " + name + " not found");
            }

            String token;

            token = jwtTokenProvider.createToken(user.getId(),name, user.getRole());

            Map<Object, Object> response = new HashMap<>();
            response.put("name", name);
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }
}

