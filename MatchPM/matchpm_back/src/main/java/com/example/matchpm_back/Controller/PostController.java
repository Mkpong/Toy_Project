package com.example.matchpm_back.Controller;

import com.example.matchpm_back.DTO.PostDTO;
import com.example.matchpm_back.Entity.Post;
import com.example.matchpm_back.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class PostController {

    @Autowired
    PostService postService;

    @PostMapping("/api/post/write")
    public String writePost(@RequestBody PostDTO postDTO){
        return postService.writePost(postDTO);
    }

    @GetMapping("/api/post/allpost")
    public List<Post> allPost(){
        return postService.allPost();
    }



}
