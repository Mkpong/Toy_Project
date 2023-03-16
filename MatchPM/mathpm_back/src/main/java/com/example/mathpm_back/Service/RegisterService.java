package com.example.mathpm_back.Service;

import com.example.mathpm_back.Entity.SiteUser;
import com.example.mathpm_back.Repository.SiteUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RegisterService {

    @Autowired
    SiteUserRepository siteUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean checkID(String userId){
        Optional<SiteUser> optionalSiteUser = siteUserRepository.findByUserId(userId);
        if(optionalSiteUser.isEmpty()) return true;
        else return false;
    }

    public void Signup(SiteUser siteUser){
        String Encodedpassword = passwordEncoder.encode(siteUser.getUserPassword());
        siteUser.setUserPassword(Encodedpassword);
        siteUserRepository.save(siteUser);
    }

}
