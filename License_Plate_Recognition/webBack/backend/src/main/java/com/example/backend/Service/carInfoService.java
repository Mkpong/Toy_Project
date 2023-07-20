package com.example.backend.Service;

import com.example.backend.DTO.SeasonTicketDTO;
import com.example.backend.DTO.carInfoDTO;
import com.example.backend.Entity.PreferentialTreatmentCar;
import com.example.backend.Entity.parkingCar;
import com.example.backend.Entity.recode;
import com.example.backend.Entity.seasonTicketCar;
import com.example.backend.Repository.PTCarRepository;
import com.example.backend.Repository.STCarRepository;
import com.example.backend.Repository.parkingCarRepository;
import com.example.backend.Repository.recodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class carInfoService {

    @Autowired
    parkingCarRepository carinforepository;
    @Autowired
    recodeRepository recoderepository;
    @Autowired
    PTCarRepository ptCarRepository;

    @Autowired
    STCarRepository stCarRepository;

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public String addCar(carInfoDTO data){
        Optional<parkingCar> op_carInfo = carinforepository.findByCarNumber(data.getResult());
        if(op_carInfo.isEmpty()){
            parkingCar carinfo = new parkingCar();
            Optional<PreferentialTreatmentCar> op_ptCar = ptCarRepository.findByCarNumber(data.getResult());
            Optional<seasonTicketCar> op_stCar = stCarRepository.findByCarNumber((data.getResult()));
            if(!op_ptCar.isEmpty()){
                carinfo.setPt_car(op_ptCar.get());
            }
            if(!op_stCar.isEmpty()){
                carinfo.setSt_car(op_stCar.get());
            }
            carinfo.setCarNumber(data.getResult());
            carinfo.setEntranceTime(data.getTime());
            carinforepository.save(carinfo);
            return "Entrance";
        }
        else {
            parkingCar find_parkingCar = op_carInfo.get();
            recode re = new recode();
            re.setCarNumber(find_parkingCar.getCarNumber());
            re.setEntranceTime(find_parkingCar.getEntranceTime());
            re.setDepartureTime(data.getTime());
            LocalDateTime dt1 = LocalDateTime.parse(find_parkingCar.getEntranceTime(), formatter);
            LocalDateTime dt2 = LocalDateTime.parse(data.getTime(), formatter);
            Duration duration = Duration.between(dt1, dt2);
            long parkingTime = duration.getSeconds() + duration.toMinutes() * 60;
            if (parkingTime < 15) re.setParkingFee(0);
            else {
                int count = (int) (parkingTime / 15) * 1500;
                if (find_parkingCar.getPt_car() != null) count /= 2;
                if (find_parkingCar.getSt_car() != null) count = 0;
                re.setParkingFee(count);
            }
            recoderepository.save(re);
            carinforepository.deleteById(find_parkingCar.getId());
            return "Departure";
        }

    }

    public List<parkingCar> getCar(){
        return carinforepository.findAll();
    }

    public List<recode> getHistory(){
        return recoderepository.findAll();
    }

    public List<seasonTicketCar> getSeasonList(){
        return stCarRepository.findAll();
    }

    public String newSeasonCar(SeasonTicketDTO st){
        Optional<seasonTicketCar> op_season = stCarRepository.findByCarNumber(st.getCar_number());
        if(op_season.isEmpty()){
            seasonTicketCar SeasonTicket = new seasonTicketCar();
            SeasonTicket.setCarNumber(st.getCar_number());
            SeasonTicket.setAuto_pay(st.isAuto_pay());
            LocalDate currentDate = LocalDate.now();
            int season_month = Integer.parseInt(st.getMonth());
            int year = currentDate.getYear();
            int month = currentDate.getMonthValue();
            int day = currentDate.getDayOfMonth();
            if(month+season_month > 12) {
                year++;
                month = month + season_month - 12;
            }
            else{
                month = month+season_month;
            }
            currentDate = LocalDate.of(year,month,day);
            SeasonTicket.setValidDate(currentDate.toString());
            stCarRepository.save(SeasonTicket);
            return "Success";
        }
        return "Fail";
    }

}
