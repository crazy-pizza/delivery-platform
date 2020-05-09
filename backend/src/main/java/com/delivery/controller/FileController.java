package com.delivery.controller;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.IoUtil;
import cn.hutool.core.lang.UUID;
import com.delivery.common.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;


@RestController
@Api(tags = "文件管理")
@RequestMapping("/file")
public class FileController {


    @ApiOperation("上传文件")
    @PostMapping("/upload")
    public Result<String> upload(@ApiIgnore MultipartFile file) throws IOException {
        String usrHome = System.getProperty("user.home");
        String fileName = UUID.fastUUID().toString();
        FileUtil.writeFromStream(file.getInputStream(), new File(usrHome + "/" + fileName));
        return Result.success(fileName);
    }


    @ApiOperation("下载文件")
    @PostMapping("/download")
    public void download(String fileName, @ApiIgnore HttpServletResponse response) throws IOException {
        String usrHome = System.getProperty("user.home");
        File file = new File(usrHome + "/" + fileName);
        FileInputStream inputStream = new FileInputStream(file);
        IoUtil.copy(inputStream, response.getOutputStream());
        inputStream.close();
    }

}
