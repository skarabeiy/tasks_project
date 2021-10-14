package itransition.project.user.controller;

import itransition.project.user.dto.UserDtoWithPassword;
import itransition.project.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(value = "/api/users/")
@CrossOrigin
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "")
    public ResponseEntity<UserDtoWithPassword> saveUser(@RequestBody  UserDtoWithPassword userDtoWithPassword) {

        UserDtoWithPassword savedUserDto = this.userService.register(userDtoWithPassword);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(savedUserDto.getId()).toUri();

        return ResponseEntity.created(location).build();
    }
}
