package com.delivery.config;

import com.delivery.common.ResultEnum;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMethod;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ResponseMessage;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket createRestApi() {

        List<ResponseMessage> apiError = Arrays.stream(ResultEnum.values()).map(result ->
                new ResponseMessageBuilder().code(result.getCode()).message(result.getMsg()).responseModel(new ModelRef("全局响应码")).build()).collect(Collectors.toList());

        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
//                .globalResponseMessage(RequestMethod.GET, apiError)
//                .globalResponseMessage(RequestMethod.POST, apiError)
//                .globalResponseMessage(RequestMethod.PUT, apiError)
//                .globalResponseMessage(RequestMethod.DELETE, apiError)
                .groupName("后端接口")
                .select()
                .apis(RequestHandlerSelectors.withClassAnnotation(Api.class))
                .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("PC外卖平台")
                .description("PC外卖平台API")
                .version("1.0")
                .build();
    }
}
