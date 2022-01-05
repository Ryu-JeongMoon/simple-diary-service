package com.simplediary.back.domain.user.service

import com.simplediary.back.domain.user.entity.User
import com.simplediary.back.domain.user.repository.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import javax.persistence.EntityNotFoundException

@Service
class UserService(
  private val userRepository: UserRepository
) {

  @Transactional(readOnly = true)
  fun findById(id: Long): User {
    return userRepository.findByIdOrNull(id) ?: throw EntityNotFoundException()
  }

  @Transactional(readOnly = true)
  fun findByUsername(username: String): User {
    return userRepository.findByUsername(username) ?: throw EntityNotFoundException()
  }
}