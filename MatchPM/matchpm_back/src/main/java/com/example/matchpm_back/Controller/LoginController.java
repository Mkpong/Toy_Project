package com.example.matchpm_back.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @GetMapping("/login")
    public String Login(){
        return "FAIL";
    }

    @GetMapping("/logout")
    public String Logout() {
        return "LOGOUT";
    }
}