package com.example.jeeproject.services;

import com.example.jeeproject.entities.Professeur;
import com.example.jeeproject.entities.Users;
import com.example.jeeproject.repositories.ElementRepository;
import com.example.jeeproject.entities.Element;
import com.example.jeeproject.repositories.ProfesseurRepository;
import com.example.jeeproject.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class ElementServiceImpl implements ElementService {
    @Autowired
    private ElementRepository elementRepository;
    @Autowired
    private ProfesseurRepository professeurRepository;
    @Override
    public List<Element> getAllElements(){
        return elementRepository.findAll();
    }


    @Override
    public Element saveElement(Element element) {
        Element ele=elementRepository.findById(element.getId()).get();
        if(ele!=null)
            return null;
        return elementRepository.save(element);
    }


    @Override
    public Element updateElement(Element element) {
        Element ele=elementRepository.findById(element.getId()).get();
        ele.setEstValide(element.isEstValide());
        return elementRepository.save(ele);
    }
    public Element updateProfesseurElement(Element element,Professeur professeur){
        Element ele=elementRepository.findById(element.getId()).get();
        if(ele!=null) {
            ele.setProfesseur(professeur);
        }
        return elementRepository.save(element);
    }

    @Override
    public Element findElement(String nom) {
        return elementRepository.findByNomElement(nom);
    }

    @Override
    public boolean affecteElementToProfesseur(Long cinUser, List<Long> codeElements) {
        codeElements.forEach(codeElement->{
            Optional<Professeur> professeur = professeurRepository.findById(cinUser);
            Optional<Element> element = elementRepository.findById(codeElement);
            if (!professeur.isPresent() || !element.isPresent()) {
                return ;
            }
            else if (element.get().getProfesseur() != null) {
                element.get().setProfesseur(null);
            }
            element.get().setProfesseur(professeur.get());
            updateElement(element.get());

        });
        return true;
    }



}
