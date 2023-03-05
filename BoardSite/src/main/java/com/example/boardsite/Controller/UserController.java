package com.example.boardsite.Controller;

import com.example.boardsite.Entity.SiteUser;
import com.example.boardsite.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String login(){
        return "User/login";
    }

    @GetMapping("/register")
    public String register(){
        return "User/register";
    }

    @PostMapping("/register")
    public String register(SiteUser user, Model model){
        userService.register(user);
        model.addAttribute("message" , "회원 가입이 완료되었습니다.");
        model.addAttribute("searchUrl" ,  "/login");

        return "message";
    }

    @GetMapping("/user/info")
    public String userInfo(){
        return "User/userinfo";
    }

    @GetMapping("/user/delete")
    public String userDelete(Integer id , Model model){
        userService.userDelete(id);
        model.addAttribute("message" , "유저 삭제가 완료되었습니다.");
        model.addAttribute("searchUrl" , "/admin/user");
        return "message";
    }


}
