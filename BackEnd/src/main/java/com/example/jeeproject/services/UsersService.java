package com.example.jeeproject.services;

import com.example.jeeproject.entities.Administrateur;
import com.example.jeeproject.entities.Professeur;
import com.example.jeeproject.entities.Users;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UsersService {
    public List<Users> findUser(String MotCle);
    public List<Users> getAllUsers();
    public Users saveUser(Users users);
    public void saveProfesseur(Professeur professeur);
    public void saveAdministrateur(Administrateur administrateur);
    public List<Users> allUSer() ;
    public List<Professeur> allProfesseur() ;
    public List<Administrateur> allAdministrateur() ;
    public List<Users> UsersWithNoCompte();
}
