package com.example.boardsite.Service;

import com.example.boardsite.Entity.Board;
import com.example.boardsite.Entity.SiteUser;
import com.example.boardsite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public SiteUser register(SiteUser user){
        String EncodedPassword =passwordEncoder.encode(user.getPassword());
        user.setPassword(EncodedPassword);
        return userRepository.save(user);
    }

    public List<SiteUser> userList(){
        return userRepository.findAll();
    }

    public void userDelete(Integer id){
        userRepository.deleteById(id);
    }

    public Page<SiteUser> userPage(int page){
        Pageable pageable = PageRequest.of(page, 10);
        return this.userRepository.findAll(pageable);
    }




}
