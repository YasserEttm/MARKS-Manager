package com.example.jeeproject.services;

import com.example.jeeproject.entities.Filiere;
import com.example.jeeproject.entities.Module;
import com.example.jeeproject.entities.Semestre;

import java.util.List;

public interface FiliereService {
    public List<Filiere> getAllFilieres();
    public List<Module> getModule(String nomFiliere, String semestre);
}
