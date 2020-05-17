package com.delivery.controller;

import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.lang.Assert;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.delivery.bean.Memcon;
import com.delivery.bean.User;
import com.delivery.common.Result;
import com.delivery.component.UserHolder;
import com.delivery.service.MemconService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;



@RestController
@Api(tags = "会话管理")
@RequestMapping("/memcon")
public class MemconController {


    @Autowired
    private MemconService memconService;


    @ApiOperation("谈话")
    @PostMapping("/talk")
    public Result talk(@RequestBody Memcon memcon) {
        User user = UserHolder.getUser();
        memcon.setFrom(user.getUserID());
        String currentTime = DateUtil.format(new Date(), DatePattern.PURE_DATETIME_PATTERN);
        memcon.setCreateTime(Long.valueOf(currentTime));
        memcon.generateSessionKey();
        memconService.save(memcon);
        return Result.success();
    }



    @ApiOperation("会话列表")
    @PostMapping("/list")
    public Result<IPage<Memcon>> list(@RequestBody Memcon memcon) {
        Assert.notNull(memcon.getTo());
        Page<Memcon> page = new Page<>(memcon.getPageNo(), memcon.getPageSize());
        User user = UserHolder.getUser();
        memcon.setFrom(user.getUserID());
        LambdaQueryWrapper<Memcon> query = new LambdaQueryWrapper<Memcon>().eq(Memcon::getSessionKey, memcon.generateSessionKey()).orderByDesc(Memcon::getCreateTime);
        IPage<Memcon> pageList = memconService.page(page, query);
        //重新排序
        List<Memcon> memconList = pageList.getRecords().stream().sorted(Comparator.comparingLong(Memcon::getCreateTime)).collect(Collectors.toList());
        pageList.setRecords(memconList);
        return Result.success(pageList);
    }


    @ApiOperation("我的会话")
    @PostMapping("/whoCallMe")
    public Result<List<Memcon>> whoCallMe() {
        User user = UserHolder.getUser();
        LambdaQueryWrapper<Memcon> query = new LambdaQueryWrapper<Memcon>()
                .eq(Memcon::getTo,user.getUserID()).select(Memcon::getFrom).groupBy(Memcon::getFrom);
        List<Memcon> list = memconService.list(query);
        return Result.success(list);
    }

}
