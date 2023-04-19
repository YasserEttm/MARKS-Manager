package com.example.jeeproject.services;
import com.example.jeeproject.entities.Administrateur;
import com.example.jeeproject.entities.Professeur;
import com.example.jeeproject.entities.Users;
import com.example.jeeproject.repositories.AdministrateurRepository;
import com.example.jeeproject.repositories.CompteRepository;
import com.example.jeeproject.entities.Compte;
import com.example.jeeproject.repositories.ProfesseurRepository;
import com.example.jeeproject.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class CompteServiceImpl implements CompteService {
        @Autowired
        private CompteRepository compteRepository;
        @Autowired
        private EmailSenderService emailSenderService;
        @Autowired
        private ProfesseurRepository professeurRepository;
        @Autowired
        private AdministrateurRepository administrateurRepository;
        @Autowired
        private UsersRepository usersRepository;

        @Override
        public Compte saveCompte(Compte compte) throws MessagingException {
            String password=initialePassword();
            if(compteRepository.findCompteByLogin(compte.getLogin())==null) {
                if (administrateurRepository.findById(compte.getId()).isPresent()) {
                    Administrateur administrateur = administrateurRepository.findById(compte.getId()).get();
                    emailSenderService.SendEmail(administrateur.getEmail(), "Welcome your password is :" + password, "Votre compte est pret !");
                    return compteRepository.save(new Compte(null, compte.getLogin(), password, administrateur));
                } else {
                    Professeur professeur = professeurRepository.findById(compte.getId()).get();
                    emailSenderService.SendEmail(professeur.getEmail(), "Welcome your password is :" + password, "Votre compte est pret !");
                    return compteRepository.save(new Compte(null, compte.getLogin(), password, professeur));
                }
            }
            else
                return null;
        }

        @Override
        public List<Compte> getAllComptes(){
            return compteRepository.findAll();
        }

        @Override
        public Compte updateCompte(Compte compte) {
            Compte result =compteRepository.findById(compte.getId()).get();
            Users users=result.getUser();
            usersRepository.save(compte.getUser());
            return compteRepository.save(compte);
        }
        public List<Compte> findCompte (String login){
            List<Compte> result =compteRepository.findCompteByLoginContaining(login);
            return result;
        }

        @Override
        public void restartCompte(Long id) throws MessagingException {
            Compte c=compteRepository.findById(id).get();
            System.out.println(c.getLogin());
            String password=initialePassword();
            c.setPassword(password);
            emailSenderService.SendEmail(c.getLogin(),"Welcome your password is :"+password,"Votre compte est pret !");
            compteRepository.save(c);

        }

        @Override
        public boolean login(String login, String password) {
            return password.equals(compteRepository.findPasswordByLogin(login));
        }

        public List<Compte> getAllProfesseurs(){
            List<Compte> comptes = new ArrayList<>();
            for (Professeur professeur : professeurRepository.findAll()) {
                comptes.add(professeur.getCompte());
            }
            return comptes;
        }
        public List<Compte> getAllAdministrateurs(){
            List<Compte> comptes = new ArrayList<>();
            for (Administrateur administrateur : administrateurRepository.findAll()) {
                comptes.add(administrateur.getCompte());
            }
            return comptes;
        }
        public void deleteCompte(Long id){
            Compte compte=compteRepository.findById(id).get();
            if(compte!=null){
                compteRepository.delete(compte);
            }
        }

        @Override
        public Compte findById(Long id) {
            return compteRepository.findById(id).get();
        }

        private String initialePassword(){
            String characteres="ABCDEFGHIJKLMNOPQRSTUVWXYZ@#";
            String randomString="";
            int length=8;
            Random rand=new Random();

            char[] password=new char[length];
            for (int i=0;i<length;i++){
                password[i]=characteres.charAt(rand.nextInt(characteres.length()));

            }
            for (int i=0;i<password.length;i++)
            {
                randomString+=password[i];
            }

            return randomString;
        }

        @Override
        public List<Compte> CompteWithNoUser() {
            return compteRepository.findAllByUserIsNull();
        }

}
