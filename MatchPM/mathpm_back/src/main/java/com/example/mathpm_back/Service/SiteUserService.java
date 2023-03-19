package com.example.mathpm_back.Service;

import com.example.mathpm_back.Entity.SiteUser;
import com.example.mathpm_back.Repository.SiteUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SiteUserService {

    @Autowired
    SiteUserRepository siteUserRepository;

    public SiteUser finduser(String userId){
        Optional<SiteUser> siteUser = siteUserRepository.findByUserId(userId);
        if(siteUser != null){
            return siteUser.get();
        }
        else{
            return null;
        }
    }

}
