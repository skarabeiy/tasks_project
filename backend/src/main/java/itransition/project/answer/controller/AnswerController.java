package itransition.project.answer.controller;

import itransition.project.answer.dto.AnswerDto;
import itransition.project.answer.dto.ResultDto;
import itransition.project.answer.model.Answer;
import itransition.project.answer.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/answers/")
@CrossOrigin
public class AnswerController {
    private final AnswerService answerService;

    @Autowired
    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @PostMapping
    public ResponseEntity<ResultDto> processAnswer(@RequestBody AnswerDto answerDto) {

         return new ResponseEntity<>(answerService.processAnswer(answerDto), HttpStatus.OK);


    }
}
