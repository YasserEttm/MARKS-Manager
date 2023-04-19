package com.example.jeeproject.repositories;
import com.example.jeeproject.entities.Element;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ElementRepository extends JpaRepository<Element,Long> {
    public List<Element> getElementByModule_NomModule(String codeModule);
    public Element findByNomElement(String nom);

}
