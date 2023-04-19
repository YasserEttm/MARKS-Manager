package com.example.jeeproject.services;

import com.example.jeeproject.entities.Administrateur;
import com.example.jeeproject.entities.Professeur;
import com.example.jeeproject.repositories.AdministrateurRepository;
import com.example.jeeproject.repositories.ProfesseurRepository;
import com.example.jeeproject.repositories.UsersRepository;
import com.example.jeeproject.entities.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsersServiceImpl implements UsersService {
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private ProfesseurRepository professeurRepository;
    @Autowired
    private AdministrateurRepository administrateurRepository;
    @Override
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }
    public void saveProfesseur(Professeur professeur){
        usersRepository.save(professeur);
    }

    public void saveAdministrateur(Administrateur administrateur){
        usersRepository.save(administrateur);
    }


    @Override
    public Users saveUser(Users users) {
        return usersRepository.save(users);
    }

    @Override
    public List<Users> findUser(String cin) {
        Users userCin=usersRepository.findByCin(cin);
        List<Users> users=new ArrayList<>();
        if(userCin!=null){
            users.add(userCin);
        }
        List<Users> userNom=usersRepository.findByNomContaining(cin);
        if (userNom!=null){
            users.addAll(userNom);
        }
        List<Users> userPrenom=usersRepository.findByPrenomContaining(cin);
        if(userPrenom!=null){
            users.addAll(userPrenom);
        }
        return users;
    }

    @Override
    public List<Users> UsersWithNoCompte(){
        return usersRepository.findAllByCompteIsNull();
    }

    public List<Users> allUSer() {
        return usersRepository.findAll();
    }
    public List<Professeur> allProfesseur() {
        return professeurRepository.findAll();
    }
    public List<Administrateur> allAdministrateur() {
        return administrateurRepository.findAll();
    }


}