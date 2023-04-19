package com.example.jeeproject.repositories;

import com.example.jeeproject.entities.Filiere;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FiliereRepository extends JpaRepository<Filiere,Long> {
    public Filiere getFiliereByNomFiliere(String nom);

}
