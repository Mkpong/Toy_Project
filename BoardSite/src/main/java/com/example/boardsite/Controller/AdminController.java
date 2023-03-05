package com.example.boardsite.Controller;

import com.example.boardsite.Entity.Board;
import com.example.boardsite.Entity.SiteUser;
import com.example.boardsite.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/admin/user")
    public String userAdmin(Model model , @RequestParam(value="page", defaultValue="0") int page){
        Page<SiteUser> userpage = this.userService.userPage(page);
        model.addAttribute("user" , userpage);
        return "admin/user";
    }

}
