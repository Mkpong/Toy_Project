package com.example.matchpm_back.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DataFormatController {

    String[] year = {"1950" , "1951", "1952", "1953", "1954", "1955", "1956", "1957", "1958", "1959", "1960",
            "1961", "1962", "1963", "1964", "1965", "1966", "1967", "1968", "1969", "1970",
            "1971", "1972", "1973", "1974", "1975", "1976", "1977", "1978", "1979", "1980",
            "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990",
            "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000",
            "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010"};
    String[] month = {"1" , "2" , "3" ,"4", "5", "6", "7", "8", "9", "10" , "11", "12"};
    String[] day = {"1" , "2" , "3" ,"4", "5", "6", "7", "8", "9", "10" , "11", "12", "13", "14", "15",
    "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"};
    String[] skills = {"JAVA" , "JAVASCRIPT" , "HTML" , "CSS" , "REACT" , "NODE" , "PYTHON" , "C" , "C#" , "C++" };

    @GetMapping("/api/dataformat/skills")
    public String[] getSkills(){
        return skills;
    }

    @GetMapping("/api/dataformat/year")
    public String[] getYear(){ return year; }

    @GetMapping("/api/dataformat/month")
    public String[] getMonth(){ return month; }

    @GetMapping("/api/dataformat/day")
    public String[] getDay() { return day; }


}