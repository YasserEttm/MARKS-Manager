package com.example.jeeproject.repositories;
import com.example.jeeproject.entities.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note,Long> {

      public List<Note> findAllByElement_NomElement(String code);
      public List<Note> findAllByEtudiant_Id(String cin);
}
