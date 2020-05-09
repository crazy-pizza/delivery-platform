package com.delivery.config;

import cn.hutool.core.lang.Snowflake;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author YuanChong
 * @create 2020-05-09 17:06
 * @desc
 */
@Configuration
public class CommonConfig {


    @Bean
    public Snowflake snowflake() {
        return new Snowflake(1,1);
    }
}
