package com.example.PreProject313.controller;

import com.example.PreProject313.model.User;
import com.example.PreProject313.service.RegistrationService;
import com.example.PreProject313.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rest")
public class RESTConrtoller {

    private final UserService userService;
    private final RegistrationService registrationService;

    @Autowired
    public RESTConrtoller(UserService userService, RegistrationService registrationService) {
        this.userService = userService;
        this.registrationService = registrationService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @GetMapping("user")
    public ResponseEntity<User> getUserByUsername(Principal principal) {
        return new ResponseEntity<>(userService.loadUserByUsername(principal.getName()), HttpStatus.OK);
    }

    @PostMapping("/new")
    public ResponseEntity<Exception> create(@Valid @RequestBody User user,
                                            BindingResult bindingResult){
        if(bindingResult.hasErrors()) {
            String bindingErrors = getErrors(bindingResult);
            return new ResponseEntity<>(new Exception(bindingErrors), HttpStatus.BAD_REQUEST);
        }

        registrationService.register(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Exception> delete(@PathVariable("id") long id) {
        userService.delete(id);
        return new ResponseEntity<>(new Exception("Sucsess"), HttpStatus.OK);
    }

    @PatchMapping("/users/{id}")
    public ResponseEntity<Exception> edit(@PathVariable("id") long id,
                                          @Valid @RequestBody User user,
                                          BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            String bindingErrors = getErrors(bindingResult);
            return new ResponseEntity<>(new Exception(bindingErrors), HttpStatus.BAD_REQUEST);
        }
        registrationService.codePassword(user);
        userService.update(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private String getErrors(BindingResult bindingResult) {
        return bindingResult.getFieldErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.joining("; "));
    }
}
