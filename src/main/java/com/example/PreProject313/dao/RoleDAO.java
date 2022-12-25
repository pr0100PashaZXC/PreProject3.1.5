package com.example.PreProject313.dao;

import com.example.PreProject313.model.Role;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@Transactional
public class RoleDAO {
    @PersistenceContext
    private EntityManager entityManager;

    public RoleDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<Role> getAllRoles() {
        return entityManager.createQuery("select  r from Role r", Role.class).getResultList();
    }

    public void save(Role role) {
        entityManager.persist(role);
    }

    public Role getRoleById(long id) {
        return entityManager.find(Role.class, id);
    }

    public Set<Role> findByIdRoles(List<Long> roles) {
        TypedQuery<Role> q = entityManager.createQuery("select r from Role r where r.id in :role", Role.class);
        q.setParameter("role",roles);
        return new HashSet<>(q.getResultList());
    }
}
