package com.simplediary.back.domain.repository

import org.springframework.data.jpa.repository.JpaRepository
import com.simplediary.back.domain.entity.Diary

interface DiaryRepository : JpaRepository<Diary?, Long?>