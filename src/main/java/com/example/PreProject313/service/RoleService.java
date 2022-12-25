package com.example.PreProject313.service;

import com.example.PreProject313.dao.RoleDAO;
import com.example.PreProject313.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@Transactional
public class RoleService {

    private RoleDAO roleDAO;

    @Autowired
    public RoleService(RoleDAO roleDAO) {
        this.roleDAO = roleDAO;
        defaultRole();
    }

    public List<Role> getAllRoles() {
        return roleDAO.getAllRoles();
    }

    public void save(Role role) {
        roleDAO.save(role);
    }



    public Role getRoleById(long id) {
        return roleDAO.getRoleById(id);
    }

    public void defaultRole() {
        roleDAO.save(new Role(1L,"ROLE_USER"));
        roleDAO.save(new Role(2L,"ROLE_ADMIN"));
    }

    public Set<Role> findByIdRoles(List<Long> roles) {
         return roleDAO.findByIdRoles(roles);
    }
}
