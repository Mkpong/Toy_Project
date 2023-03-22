package com.example.matchpm_back.Service;

import com.example.matchpm_back.Entity.SiteUser;
import com.example.matchpm_back.Repository.SiteUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
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

    public List<String> findSkill(String userId){
        Optional<SiteUser> op_siteUser = siteUserRepository.findByUserId(userId);
        SiteUser siteUser = op_siteUser.get();
        List<String> userSkill = new ArrayList<>();
        if(siteUser != null){
            String skill = siteUser.getUserSkill();
            if(skill == null || skill.equals("")){
                return userSkill;
            }
            String[] data = skill.split("_");
            for(int i = 0 ; i < data.length ; i++){
                userSkill.add(data[i]);
            }
            return userSkill;
        }
        else{
            return userSkill;
        }
    }

    public String modifySiteUser(int id, SiteUser siteUser){
        Optional<SiteUser> op_user = siteUserRepository.findById(id);
        if(op_user == null) return "fail";
        else{
            siteUserRepository.save(siteUser);
            return "success";
        }
    }

    public List<SiteUser> getAllUser(){
        return siteUserRepository.findAll();
    }

    public String deleteSiteUser(String userId){
        Optional<SiteUser> op_siteUser = siteUserRepository.findByUserId(userId);
        if(op_siteUser == null) return "fail";
        SiteUser siteUser = op_siteUser.get();
        siteUserRepository.deleteById(siteUser.getId());
        return "success";
    }

}