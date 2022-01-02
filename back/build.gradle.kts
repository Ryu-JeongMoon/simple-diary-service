import org.jetbrains.kotlin.builtins.StandardNames.FqNames.annotation

buildscript {
  val kotlinVersion = "1.6.10"
  val springBootVersion = "2.6.1"

  repositories {
    gradlePluginPortal()
  }

  dependencies {
    classpath("org.springframework.boot:spring-boot-gradle-plugin:$springBootVersion")
    classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")
    classpath("org.jetbrains.kotlin:kotlin-allopen:$kotlinVersion")
    classpath("org.jetbrains.kotlin:kotlin-noarg:$kotlinVersion")
  }
}

plugins {
  java
  jacoco
  id("org.jetbrains.kotlin.jvm") version "1.6.10"
  id("org.asciidoctor.convert") version "1.5.9.2"
  id("org.jetbrains.kotlin.plugin.allopen") version "1.6.10"
  id("org.jetbrains.kotlin.plugin.noarg") version "1.6.10"
  kotlin("kapt") version "1.6.10"
}

apply {
  plugin("kotlin")
  plugin("kotlin-jpa")
  plugin("kotlin-spring")
  plugin("kotlin-allopen")
  plugin("kotlin-noarg")
  plugin("idea")
  plugin("eclipse")
  plugin("application")
  plugin("org.springframework.boot")
  plugin("io.spring.dependency-management")
  plugin("org.asciidoctor.gradle.asciidoctor")
}

noArg {
  annotation("javax.persistence.Entity")
  annotation("javax.persistence.MappedSuperclass")
  annotation("javax.persistence.Embeddable")
}

allOpen {
  annotation ("javax.persistence.Entity")
  annotation("javax.persistence.MappedSuperclass")
  annotation("javax.persistence.Embeddable")
}

repositories {
  mavenCentral()
}

group = "com.simplediary"
version = "1.0.0"
java.sourceCompatibility = JavaVersion.VERSION_11
java.targetCompatibility = JavaVersion.VERSION_11

dependencies {

  implementation("org.springframework.boot:spring-boot-starter-webflux")
  implementation("org.springframework.boot:spring-boot-starter-security")
  implementation("org.springframework.boot:spring-boot-starter-validation")

  implementation("org.springframework.boot:spring-boot-starter-data-jpa")
  implementation("org.springframework.boot:spring-boot-starter-data-redis")

  implementation("io.springfox:springfox-swagger2:3.0.0")
  implementation("io.springfox:springfox-swagger-ui:3.0.0")
  implementation("com.fasterxml.jackson.core:jackson-databind")

  implementation("org.jetbrains.kotlin:kotlin-reflect")
  implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
  implementation("com.fasterxml.jackson.module:jackson-module-kotlin")

  runtimeOnly("com.h2database:h2:2.0.202")
  compileOnly("org.projectlombok:lombok")

  testImplementation("com.h2database:h2:2.0.202")
  testImplementation("org.springframework.boot:spring-boot-starter-test")
}

kapt {
  useBuildCache = true
  correctErrorTypes = true
}

tasks {

  test {
    useJUnitPlatform()
  }

  compileKotlin {
    kotlinOptions {
      freeCompilerArgs = listOf("-Xjsr305=strict")
      jvmTarget = "11"
    }
  }

  compileTestKotlin {
    kotlinOptions {
      freeCompilerArgs = listOf("-Xjsr305=strict")
      jvmTarget = "11"
    }
  }
}