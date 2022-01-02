package com.simplediary.back.service.concrete

import lombok.RequiredArgsConstructor
import com.simplediary.back.domain.repository.UserRepository
import com.simplediary.back.domain.repository.DiaryRepository
import org.springframework.stereotype.Service

@Service
@RequiredArgsConstructor
class JpaUserService {
    private val userRepository: UserRepository? = null
}