package itransition.project.user.service;

import itransition.project.user.dto.UserDto;
import itransition.project.user.dto.UserDtoWithPassword;
import itransition.project.user.model.User;

import java.util.List;

public interface UserService {

    UserDtoWithPassword register(UserDtoWithPassword userDtoWithPassword);

    List<UserDto> findAll();

    UserDtoWithPassword findByName(String name);

//    User findById(Long id);

//    void delete(Long id);
}
