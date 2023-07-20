package com.example.backend.Controller;

import com.example.backend.DTO.SeasonTicketDTO;
import com.example.backend.DTO.carInfoDTO;
import com.example.backend.Entity.parkingCar;
import com.example.backend.Entity.recode;
import com.example.backend.Entity.seasonTicketCar;
import com.example.backend.Service.carInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class carInfoController {

    @Autowired
    carInfoService carinfoservice;

    @PostMapping ("/detect")
    public String addCar(@RequestBody carInfoDTO data){
        return carinfoservice.addCar(data);
    }

    @GetMapping("/carinfolist")
    public List<parkingCar> getCar(){
        return carinfoservice.getCar();
    }

    @GetMapping("/history")
    public List<recode> getHistory(){return carinfoservice.getHistory();}

    @GetMapping("/season/list")
    public List<seasonTicketCar> getSeasonList(){
        return carinfoservice.getSeasonList();
    }

    @PostMapping("/season/new")
    public String newSeasonCar(@RequestBody SeasonTicketDTO st){
        return carinfoservice.newSeasonCar(st);
    }

}
