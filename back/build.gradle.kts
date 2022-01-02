import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.jetbrains.kotlin.kapt3.base.Kapt.kapt

buildscript {
    val kotlinVersion = "1.6.10"
    val springBootVersion = "2.6.1"

    repositories {
        gradlePluginPortal()
    }

    dependencies {
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")
        classpath("org.jetbrains.kotlin:kotlin-allopen:$kotlinVersion")
        classpath("org.springframework.boot:spring-boot-gradle-plugin:$springBootVersion")
    }
}

plugins {
    java
    jacoco
    id("org.jetbrains.kotlin.jvm") version "1.6.10"
    id("org.asciidoctor.convert") version "1.5.9.2"
    kotlin("kapt") version "1.6.10"
}

apply {
    plugin("kotlin")
    plugin("kotlin-spring")
    plugin("idea")
    plugin("eclipse")
    plugin("application")
    plugin("org.springframework.boot")
    plugin("io.spring.dependency-management")
    plugin("org.asciidoctor.gradle.asciidoctor")
}

repositories {
    mavenCentral()
}


group = "com.simplediary"
version = "1.0.0"

dependencies {

    implementation("org.springframework.boot:spring-boot-starter-webflux")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-validation")

    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-data-redis")

    implementation ("io.springfox:springfox-swagger2:3.0.0")
    implementation ("io.springfox:springfox-swagger-ui:3.0.0")
    implementation("com.fasterxml.jackson.core:jackson-databind")

    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")

    runtimeOnly("com.h2database:h2:2.0.202")
    compileOnly("org.projectlombok:lombok")

    testImplementation("com.h2database:h2:2.0.202")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        jvmTarget = "1.8"
        freeCompilerArgs = listOf("-Xjsr305=strict")
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}