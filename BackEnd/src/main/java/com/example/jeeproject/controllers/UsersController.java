package com.example.jeeproject.controllers;
import com.example.jeeproject.entities.Administrateur;
import com.example.jeeproject.entities.Professeur;
import com.example.jeeproject.entities.Users;
import com.example.jeeproject.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UsersController{
        @Autowired
        private UsersService usersService;

        @PostMapping(value = "/saveProfesseur")
        public void saveProfesseur(@RequestBody Professeur professeur){
            usersService.saveProfesseur(professeur);
        }

        @PostMapping(value = "/saveAdministrateur")
        public void saveAdministrateur(@RequestBody Administrateur administrateur){
            usersService.saveAdministrateur(administrateur);
        }
        @GetMapping(value = "/find/{id}")
        public List<Users> findUsers(@PathVariable String id){
            return usersService.findUser(id);
        }
        @GetMapping(value = "/all")
        public List<Professeur> allProfesseur(){
            return usersService.allProfesseur();

        }

        @GetMapping(value = "/noCompte")
        public List<Users> UsersWithNoCompte(){
            return usersService.UsersWithNoCompte();
        }
}
