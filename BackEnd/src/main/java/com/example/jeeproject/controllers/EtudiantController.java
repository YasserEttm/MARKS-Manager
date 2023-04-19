package com.example.jeeproject.controllers;

import com.example.jeeproject.entities.Etudiant;
import com.example.jeeproject.services.EtudiantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/etudiant")
public class EtudiantController {
    @Autowired
    private EtudiantService etudiantService;

    @GetMapping(value = "/all")
    public List<Etudiant> getAllEtudiants(){
        return etudiantService.getAllEtudiants();
    }
    @GetMapping(value = "/find/{cin}")
    public Etudiant findEtudiant(@PathVariable String cin){
        return etudiantService.findEtudiant(cin);
    }
    @PostMapping(value = "/update")
    public Etudiant updateEtudiant(@RequestBody Etudiant etudiant){
        return etudiantService.updateEtudiant(etudiant);
    }
    @PostMapping(value = "/save")
    public Etudiant saveEtudiant(@RequestBody Etudiant etudiant){
        return etudiantService.saveEtudiant(etudiant);
    }
    @PostMapping(value = "/delete/{id}")
    public void deleteEtudiant(@PathVariable String id){
         etudiantService.deleteEtudiant(id);
    }

}
