package com.example.jeeproject.controllers;

import com.example.jeeproject.entities.Filiere;
import com.example.jeeproject.entities.Module;
import com.example.jeeproject.entities.Semestre;
import com.example.jeeproject.services.FiliereService;
import com.example.jeeproject.services.FiliereServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/filiere")
public class FiliereController {
    @Autowired
    private FiliereService filiereService;
    @GetMapping(value = "/all")
    public List<Filiere> filiereList(){
        return filiereService.getAllFilieres();
    }
    @GetMapping(value = "/module/{filiere}/{semestre}")
    public List<Module> getModule(@PathVariable String filiere,@PathVariable String semestre){
        return filiereService.getModule(filiere,semestre);
    }

}
