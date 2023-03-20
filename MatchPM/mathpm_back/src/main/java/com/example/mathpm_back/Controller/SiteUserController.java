package com.example.mathpm_back.Controller;

import com.example.mathpm_back.Entity.SiteUser;
import com.example.mathpm_back.Service.SiteUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class SiteUserController {

    @Autowired
    SiteUserService siteUserService;

    //ID 가져오기
    @GetMapping("/api/siteuser/getid")
    public String getSiteUserId(Principal principal){
        if(principal == null){
            return "";
        }
        return principal.getName();
    }

    //권한 리스트 가져오기
    @GetMapping("/api/siteuser/getauthentication")
    public List<String> getAuthentication(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<String> roles = new ArrayList<>();
        for (GrantedAuthority authority : authentication.getAuthorities()) {
            roles.add(authority.getAuthority());
        }
        return roles;
    }

    @PostMapping("/api/siteuser/finduser")
    public SiteUser finduser(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.get("userId"));
        return siteUserService.finduser(requestBody.get("userId"));
    }

    @PostMapping("/api/siteuser/getskill")
    public List<String> findSkill(@RequestBody Map<String ,String> requestBody){
        String userId = requestBody.get("userId");
        return siteUserService.findSkill(userId);
    }

}
