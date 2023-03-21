package com.example.matchpm_back.Controller;

import com.example.matchpm_back.Entity.SiteUser;
import com.example.matchpm_back.Service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegisterController {

    @Autowired
    RegisterService registerService;

    //ID중복체크
    @PostMapping("/api/register/idcheck")
    public boolean CheckID(@RequestBody SiteUser siteUser){
        return registerService.checkID(siteUser.getUserId());
    }

    @PostMapping("/api/register/signup")
    public String Signup(@RequestBody SiteUser siteUser){
        registerService.Signup(siteUser);
        return "signup";
    }


}