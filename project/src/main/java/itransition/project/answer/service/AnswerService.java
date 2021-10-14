package itransition.project.answer.service;

import itransition.project.answer.dto.AnswerDto;
import itransition.project.answer.dto.ResultDto;

public interface AnswerService {
    ResultDto processAnswer(AnswerDto answerDto);
}
