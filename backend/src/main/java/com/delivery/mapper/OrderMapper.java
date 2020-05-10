package com.delivery.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.delivery.bean.Order;
import com.delivery.bean.OrderReport;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author ~
 * @since 2020-05-09
 */
@Mapper
public interface OrderMapper extends BaseMapper<Order> {


    List<OrderReport> report(OrderReport orderReport);

}
