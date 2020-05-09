package com.delivery.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.delivery.bean.user.User;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author ~
 * @since 2020-05-09
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

}
