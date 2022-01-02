package com.simplediary.back.domain.entity

import java.time.LocalDateTime
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
class Diary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private val id: Long = 0
    private val username: String? = null
    private val content: String? = null
    private val datetimeFrom: LocalDateTime? = null
    private val datetimeTo: LocalDateTime? = null
}
