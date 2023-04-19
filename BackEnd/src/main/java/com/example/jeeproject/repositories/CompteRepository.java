package com.example.jeeproject.repositories;

import com.example.jeeproject.entities.Compte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CompteRepository extends JpaRepository<Compte,Long> {
    public List<Compte> findByLoginEndingWith(String specialite);
    public Compte findCompteByLogin(String login);
    public List<Compte> findCompteByLoginContaining(String login);
    @Query("select c.password from Compte c where c.login =: login")
    public String findPasswordByLogin(String login);
    public List<Compte> findAllByUserIsNull();
}
