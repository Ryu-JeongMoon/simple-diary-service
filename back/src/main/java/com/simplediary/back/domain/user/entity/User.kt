package com.simplediary.back.domain.user.entity

import com.simplediary.back.domain.BaseEntity
import javax.persistence.*
import javax.validation.constraints.Size

@Entity
@Table(name = "USERS")
class User : BaseEntity {

  @Id
  @Column(name = "user_id")
  @GeneratedValue(strategy = GenerationType.AUTO)
  var id: Long? = null

  @Size(min = 4, max = 255)
  @Column(nullable = false)
  var username: String

  @Size(min = 4, max = 255)
  @Column(nullable = false)
  var password: String

  @Enumerated(EnumType.STRING)
  var socialType: SocialType

  constructor(username: String, password: String, socialType: SocialType) {
    this.username = username
    this.password = password
    this.socialType = socialType
  }
}