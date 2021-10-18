package itransition.project.user.controller;

import itransition.project.user.dto.UserDto;
import itransition.project.user.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/admin/")
@CrossOrigin
public class AdminController {
    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserDto> findAllUser(){
        return userService.findAll();
    }

}
