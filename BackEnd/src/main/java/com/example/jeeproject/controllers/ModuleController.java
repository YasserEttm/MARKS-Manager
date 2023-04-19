package com.example.jeeproject.controllers;

import com.example.jeeproject.entities.Element;
import com.example.jeeproject.entities.Module;
import com.example.jeeproject.services.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/module")
@CrossOrigin
public class ModuleController {
    @Autowired
    private ModuleService moduleService;
    @GetMapping(value = "/all")
    public List<Module> getAllModule(){
        return moduleService.getAllModule();
    }
    @GetMapping(value = "/element")
    public List<Element> getElements(@PathVariable String codeModule){
        return moduleService.getElements(codeModule);
    }

}
