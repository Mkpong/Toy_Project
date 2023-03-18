package com.example.mathpm_back.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class SiteUserController {

    @GetMapping("/api/siteuser/getid")
    public String getSiteUserId(Principal principal){
        if(principal == null){
            return "";
        }
        return principal.getName();
    }

}
