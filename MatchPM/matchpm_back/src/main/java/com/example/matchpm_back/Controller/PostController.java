package com.example.matchpm_back.Controller;

import com.example.matchpm_back.DTO.PostDTO;
import com.example.matchpm_back.Entity.Post;
import com.example.matchpm_back.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/api/post/getpost/{id}")
    public Post getPostById(@PathVariable("id") Integer id){
        return postService.getPostById(id);
    }

    @GetMapping("/api/post/delete/{id}")
    public String deletePost(@PathVariable("id") Integer id,
                             @RequestParam(value="boardId")Integer boardId){
        return postService.deletePost(id , boardId);
    }

    @GetMapping("/api/post/updatelike")
    public void updateLike(@RequestParam(value = "id")int id , @RequestParam(value = "type")String type){
        postService.updateLike(id, type);
    }

    @GetMapping("/api/post/bestpost")
    public List<Post> bestPost() {
        return postService.bestPost();
    } //가장 많은 추천을 받은 상위 10개의 글을 불러온다.


}
