package com.example.mathpm_back.Entity;

import jakarta.persistence.*;
import lombok.Data;

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


}
