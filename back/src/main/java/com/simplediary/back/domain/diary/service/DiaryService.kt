package com.simplediary.back.domain.diary.service

import com.simplediary.back.domain.diary.repository.DiaryRepository
import lombok.RequiredArgsConstructor
import org.springframework.stereotype.Service

@Service
@RequiredArgsConstructor
class DiaryService(
  private val diaryRepository: DiaryRepository
) {
}