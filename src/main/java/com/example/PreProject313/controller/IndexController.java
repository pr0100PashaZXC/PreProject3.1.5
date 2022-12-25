package com.example.PreProject313.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("/auth/login")
    public String loginPage() {
        return "auth/login";
    }

}
