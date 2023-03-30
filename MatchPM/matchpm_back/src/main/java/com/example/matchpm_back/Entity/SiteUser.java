package com.example.matchpm_back.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name="siteuser")
public class SiteUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "userid")
    private String userId;
    @Column(name = "userpassword")
    private String userPassword;

    @Column(name = "name")
    private String userName;

    @Column(name = "year")
    private String userYear;

    @Column(name = "month")
    private String userMonth;

    @Column(name = "day")
    private String userDay;

    @Column(name = "sex")
    private String userSex;

    @Column(name = "email")
    private String userEmail;

    @Column(name ="phonenumber")
    private String userPhonenumber;

    @Column(name ="introduce")
    private String userIntroduce;

    @Column(name = "skill")
    private String userSkill;

    @Column(name = "pmscore")
    private int userPmscore;

    @JsonIgnore
    @OneToMany(mappedBy = "siteUser")
    private List<Post> posts = new ArrayList<>();

}