import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {Button, List, Card} from 'antd';
import {StopOutlined} from '@ant-design/icons'

const FollowList = ({header, data}) => {
    const style = useMemo(() => ({marginBottom: 20}))
    const grid = useMemo(() => ({gutter: 4, xs: 2, md: 3}))
    const loadMore = useMemo(() => ({textAlign: 'center', margin: '10px 0'}))
    const ListItem = useMemo(() => ({marginTop: 20}))
    return (
        <List
            style={style}
            grid={grid}
            size="small"
            header={<div>{header}</div>}
            loadMore={<div style={loadMore}><Button>더보기</Button></div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item style={ListItem}>
                    <Card actions={[<StopOutlined key="stop" />]}>
                        <Card.Meta description={item.nickname} />
                    </Card>
                </List.Item>
            )}
        />
    )
}

FollowList.propTypes = {
    header: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
};

export default FollowList;