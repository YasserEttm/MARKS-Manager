package com.example.jeeproject.services;

import com.example.jeeproject.entities.Compte;

import javax.mail.MessagingException;
import java.util.List;

public interface CompteService {
    public Compte saveCompte(Compte compte) throws MessagingException;

    public List<Compte> getAllComptes();

    public Compte updateCompte(Compte compte);

    public List<Compte> getAllProfesseurs();

    public List<Compte> getAllAdministrateurs();

    public List<Compte> findCompte(String login);

    public void restartCompte(Long id) throws MessagingException;

    public boolean login(String login, String password);

    public void deleteCompte(Long id);
    public Compte findById(Long id);
    public List<Compte> CompteWithNoUser();
}