package com.example.jeeproject.repositories;
import com.example.jeeproject.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsersRepository extends JpaRepository<Users,Long> {
     Users findByCin(String cin);
    public List<Users> findByNomContaining(String motCle);
    public List<Users> findByPrenomContaining(String motCle);
    public List<Users> findAllByCompteIsNull();
}
