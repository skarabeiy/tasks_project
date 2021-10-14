package itransition.project.achievement.controller;

import itransition.project.achievement.service.AchievementService;
import itransition.project.user.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/user/")
@CrossOrigin
public class AchievementController {
    private final AchievementService achievementService;

    @Autowired
    public AchievementController(AchievementService achievementService) {
        this.achievementService = achievementService;
    }

    @GetMapping(value = "{id}/achievements")
    public UserDto processAchievement(@PathVariable("id") long id) {
    //!!!!!
        return achievementService.processAchievement(id);
    }
}
