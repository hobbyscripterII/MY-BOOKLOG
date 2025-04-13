package com.project.booklog.user;

import org.apache.ibatis.annotations.Mapper;

import com.project.booklog.security.MyUserDetails;

@Mapper
public interface UserMapper {
	MyUserDetails getUser(String id);
}
