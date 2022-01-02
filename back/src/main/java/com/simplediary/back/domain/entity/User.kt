package com.simplediary.back.domain.entity

import lombok.AllArgsConstructor
import lombok.Builder
import lombok.Getter
import lombok.NoArgsConstructor
import javax.persistence.*
import javax.validation.constraints.Size

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
class User {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private val id: Long = 0

    @Column(nullable = false)
    private val username: @Size(max = 255) String? = null

    @Column(nullable = false)
    private val password: @Size(min = 4, max = 255) String? = null
}