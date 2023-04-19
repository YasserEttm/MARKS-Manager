package com.example.jeeproject.services;

import com.example.jeeproject.entities.Element;
import com.example.jeeproject.entities.Professeur;

import java.util.List;

public interface ElementService {
    public List<Element> getAllElements();
    public Element saveElement(Element element);
    public Element updateElement(Element element);
    public Element findElement(String id);
    public boolean affecteElementToProfesseur(Long idUser, List<Long> codeElement);
    public Element updateProfesseurElement(Element element, Professeur professeur);
}
