package com.example.jeeproject.repositories;
import com.example.jeeproject.entities.Element;
import com.example.jeeproject.entities.Module;
import com.example.jeeproject.entities.Semestre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ModuleRepository extends JpaRepository<Module,Long> {
    public Module findByNomModule(String nom);
    public List<Module> findModulesByFiliere_NomFiliereAndSemestreIs(String filiere, String semestre);
}
