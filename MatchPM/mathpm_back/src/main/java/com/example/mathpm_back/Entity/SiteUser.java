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
    private String userid;
    @Column(name = "userpassword")
    private String userpassword;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name ="phonenumber")
    private String phonenumber;





}
