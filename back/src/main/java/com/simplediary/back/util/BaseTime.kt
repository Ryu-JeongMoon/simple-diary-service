package com.simplediary.back.util

import lombok.Getter
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.EntityListeners
import javax.persistence.MappedSuperclass

@Getter
@MappedSuperclass
@EntityListeners(value = [AuditingEntityListener::class])
abstract class BaseTime {
    @CreatedDate
    @Column(updatable = false)
    protected var createdDateTime: LocalDateTime? = null

    @LastModifiedDate
    protected var lastModifiedDateTime: LocalDateTime? = null
}