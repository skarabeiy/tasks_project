package itransition.project.user.service;

import itransition.project.user.dto.UserDto;
import itransition.project.user.dto.UserDtoWithPassword;
import itransition.project.user.model.Role;
import itransition.project.user.model.User;
import itransition.project.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    @Transactional
    public UserDtoWithPassword register(UserDtoWithPassword userDtoWithPassword) {

        userDtoWithPassword.setPassword(bCryptPasswordEncoder.encode(userDtoWithPassword.getPassword()));

        User user = modelMapper.map(userDtoWithPassword, User.class);
        if(user.getRole()==null){
            user.setRole(Role.ROLE_USER);
        }
        User registeredUser = userRepository.save(user);

        log.info("IN register - user: {} successfully registered", registeredUser);
        return modelMapper.map(registeredUser, UserDtoWithPassword.class);
    }

    @Override
    public List<UserDto> findAll() {
        log.info("In UserServiceImpl findAll");
        List<User>users=userRepository.findAll();
        List<UserDto> userDtos = users.stream().map(task -> modelMapper.map(task, UserDto.class)).collect(Collectors.toList());
        return userDtos;
    }

    @Override
    @Transactional
    public UserDtoWithPassword findByName(String name) {
        User result = userRepository.findByName(name);
        log.info("IN findByUsername - user: {} found by username: {}", result, name);
        return modelMapper.map(result,UserDtoWithPassword.class);
    }

//    @Override
//    public User findById(Long id) {
//        User result = userRepository.findById(id).orElse(null);
//
//        if (result == null) {
//            log.warn("IN findById - no user found by id: {}", id);
//            return null;
//        }
//
//        log.info("IN findById - user: {} found by id: {}", result);
//        return result;
//    }

//    @Override
//    public void delete(Long id) {
//        userRepository.deleteById(id);
//        log.info("IN delete - user with id: {} successfully deleted");
//    }
}
