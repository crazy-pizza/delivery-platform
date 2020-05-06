import React from 'react'
import { Row, Col } from 'antd'

const Home = () => {
    return (
        <Row className="layoutsContainer">
            <Col span={24} className="layoutsHeader">
                <div className="layoutsTool">
                    <div className="layoutsToolLeft">
                        <h1>首页</h1>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Home