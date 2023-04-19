package com.example.jeeproject.repositories;
import com.example.jeeproject.entities.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EtudiantRepository extends JpaRepository<Etudiant,Long> {
    public Etudiant findEtudiantByCode(String code);
}
