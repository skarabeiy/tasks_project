package itransition.project.user.controller;

import itransition.project.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(value = "/api/admin/")
@CrossOrigin
public class AdminController {



    @GetMapping(value = "")
    public String Hello(){


        return "hello";
    }
}
