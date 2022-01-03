package com.simplediary.back.domain.diary.repository

import com.simplediary.back.domain.diary.entity.Diary
import com.simplediary.back.domain.user.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface DiaryRepository : JpaRepository<Diary?, Long?> {
  fun findByUser(user: User): Diary?
}