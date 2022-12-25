package com.example.PreProject313.dao;


import com.example.PreProject313.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Component
@Transactional
public class UserDAO {

    @PersistenceContext
    private EntityManager entityManager;


    @Autowired
    public UserDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<User> getAllUsers() {
        return entityManager.createQuery("select u from User u", User.class).getResultList();
    }

    public void save(User user) {
        entityManager.persist(user);
    }

    public User getUserById(long id) {
        return entityManager.find(User.class, id);
    }

    public User getUserByUsername(String username) {
        return entityManager.find(User.class, username);
    }


    public void update(User user) {
        entityManager.merge(user);
    }

    public void delete(long id) {
        entityManager.remove(getUserById(id));
    }

    public User findByEmail(String email){
        return entityManager.createQuery("select u from User u where u.email =: email", User.class)
                .setParameter("email", email).getSingleResult();

    }

}
