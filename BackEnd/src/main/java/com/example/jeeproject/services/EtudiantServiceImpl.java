package com.example.jeeproject.services;

import com.example.jeeproject.entities.Element;
import com.example.jeeproject.repositories.EtudiantRepository;
import com.example.jeeproject.entities.Etudiant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EtudiantServiceImpl implements EtudiantService{
    @Autowired
    private EtudiantRepository etudiantRepository;
    @Override
    public List<Etudiant> getAllEtudiants(){
        return etudiantRepository.findAll();
    }

    @Override
    public Etudiant saveEtudiant(Etudiant etudiant) {
        Etudiant etudi=this.findEtudiant(etudiant.getCode());
        if(etudiant==null){
            return etudiantRepository.save(etudiant);
        }
        return null;
    }

    @Override
    public Etudiant updateEtudiant(Etudiant etudiant) {
        Etudiant etudi=this.findEtudiant(etudiant.getCode());
        if(etudiant!=null){
            return etudiantRepository.save(etudiant);

        }
        return null;
    }

    @Override
    public Etudiant findEtudiant(String code) {
        return etudiantRepository.findEtudiantByCode(code);
    }

    @Override
    public void deleteEtudiant(String id) {
        Etudiant etudiant=this.findEtudiant(id);
        if(etudiant!=null)
            etudiantRepository.delete(etudiant);
    }


}
