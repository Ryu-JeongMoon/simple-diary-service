package com.simplediary.back.service.concrete

import lombok.RequiredArgsConstructor
import com.simplediary.back.domain.diary.repository.DiaryRepository
import org.springframework.stereotype.Service

@Service
@RequiredArgsConstructor
class JpaDiaryService {
    private val diaryRepository: DiaryRepository? = null
}