package com.example.jeeproject.controllers;

import com.example.jeeproject.entities.Compte;
import com.example.jeeproject.entities.Professeur;
import com.example.jeeproject.entities.Users;
import com.example.jeeproject.services.CompteService;
import com.example.jeeproject.services.EmailSenderService;
import com.example.jeeproject.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/compte")
public class CompteController {
    @Autowired
    private CompteService compteService;
    @Autowired
    private EmailSenderService emailSenderService;
    @Autowired
    private UsersService usersService;
    @GetMapping(value = "/all")

    public List<Compte> getAllComptes(){
        return compteService.getAllComptes();
    }
    @PostMapping(value = "/save")
    public Compte saveCompte(@RequestBody Compte compte) throws MessagingException {
        return compteService.saveCompte(compte);
    }

    @PostMapping (value = "/update")

    public Compte updateCompte(@RequestBody Compte compte){
        return compteService.updateCompte(compte);
    }

    @GetMapping(value = "/find/{login}")

    public List<Compte> getCompte(@PathVariable String login){
        return compteService.findCompte(login);
    }

    @GetMapping(value = "/professeur")

    public List<Compte> getAllProfesseur(){
        return compteService.getAllProfesseurs();
    }

    @GetMapping(value = "/administrateur")

    public List<Compte> getAllAdministrateur(){
        return compteService.getAllAdministrateurs();
    }
    @PostMapping(value = "/restart/{id}")
    public void restartCompte(@PathVariable Long id) throws MessagingException {
        compteService.restartCompte(id);
    }
    @PostMapping(value = "/connecter/{login}/{password}")
    public boolean login(@PathVariable String login,@PathVariable String password){
        return compteService.login(login,password);
    }
    @PostMapping(value = "/delete/{compte}")
    public void delete(@PathVariable Long compte){
         compteService.deleteCompte(compte);
    }

    @GetMapping(value = "/noUser")
    public List<Compte> compteWithNoUser(){
        return compteService.CompteWithNoUser();
    }
}
