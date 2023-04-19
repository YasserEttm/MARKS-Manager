package com.example.jeeproject.controllers;

import com.example.jeeproject.entities.Element;
import com.example.jeeproject.services.ElementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/element")
public class ElementController {
    @Autowired
    private ElementService elementService;
    @GetMapping(value = "/all")
    public List<Element> getAllElements(){
        return elementService.getAllElements();
    }
    @PostMapping(value = "/save")
    public Element saveElement(@RequestBody Element element){
        return elementService.saveElement(element);
    }

    @PostMapping(value = "/update")
    public Element updateElement(@RequestBody Element element){
        return elementService.updateElement(element);
    }
    @GetMapping(value = "/find/{id}")
    public Element findElement(@PathVariable String id){
        return elementService.findElement(id);
    }
    @PostMapping (value = "/affect/{idUser}")
    public boolean affectElementToProfesseur(@PathVariable Long idUser, @RequestBody List<Long> codeElement){
        return elementService.affecteElementToProfesseur(idUser,codeElement);
    }
}
