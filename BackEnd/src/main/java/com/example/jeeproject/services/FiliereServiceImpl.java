package com.example.jeeproject.services;

import com.example.jeeproject.entities.Module;
import com.example.jeeproject.entities.Semestre;
import com.example.jeeproject.repositories.FiliereRepository;
import com.example.jeeproject.entities.Filiere;
import com.example.jeeproject.repositories.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FiliereServiceImpl implements FiliereService{
    @Autowired
    private FiliereRepository filiereRepository;
    @Autowired
    private ModuleRepository moduleRepository;

    @Override
    public List<Filiere> getAllFilieres() {
        return filiereRepository.findAll();}

    @Override
    public List<Module> getModule(String nomFiliere, String semestre) {
        return moduleRepository.findModulesByFiliere_NomFiliereAndSemestreIs(nomFiliere,semestre);
    }
}
