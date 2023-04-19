package com.example.jeeproject.services;

import com.example.jeeproject.entities.Element;
import com.example.jeeproject.repositories.ElementRepository;
import com.example.jeeproject.repositories.ModuleRepository;
import com.example.jeeproject.entities.Module;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModuleServiceImpl implements ModuleService{
    @Autowired
    private ModuleRepository moduleRepository;
    @Autowired
    private ElementRepository elementRepository;

    @Override
    public List<Module> getAllModule() {
        return moduleRepository.findAll();
    }

    @Override
    public List<Element> getElements(String codeModule) {
        return elementRepository.getElementByModule_NomModule(codeModule);
    }
}
