package com.simplediary.back.domain.diary.entity

import com.simplediary.back.domain.BaseEntity
import com.simplediary.back.domain.user.entity.User
import java.time.LocalDateTime
import javax.persistence.*

@Entity
class Diary : BaseEntity {
  @Id
  @Column(name = "diary_id")
  @GeneratedValue(strategy = GenerationType.AUTO)
  var id: Long? = null

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  var user: User

  var content: String? = ""
  var datetimeFrom: LocalDateTime? = null
  var datetimeTo: LocalDateTime? = null

  constructor(content: String, datetimeFrom: LocalDateTime, datetimeTo: LocalDateTime, user: User) : super() {
    this.content = content
    this.datetimeFrom = datetimeFrom
    this.datetimeTo = datetimeTo
    this.user = user
  }
}
