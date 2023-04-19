package com.example.jeeproject.services;

import com.example.jeeproject.entities.Etudiant;

import java.util.List;

public interface EtudiantService {
    public List<Etudiant> getAllEtudiants();
    public Etudiant saveEtudiant(Etudiant etudiant);
    public Etudiant updateEtudiant(Etudiant etudiant);
    public Etudiant findEtudiant(String code);
    public void deleteEtudiant(String id);


}
