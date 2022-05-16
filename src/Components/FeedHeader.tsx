import moment from 'moment';

import * as React from "react"


export interface IFeedHeaderProps {
    createdTs: string;
}

export default function FeedHeader({ createdTs }: IFeedHeaderProps) {
    return (
        <div style={styles.container}>
            <span style={{ marginRight: "5px" }}>{moment(new Date(createdTs)).fromNow()}</span>
        </div>
    );
}

const styles: { [name: string]: React.CSSProperties } = {
    container: {
        width: "100%",
        height: "30px",
        backgroundColor: '#111',
        borderTop: '1px solid #777',
        alignItems: 'center',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'flex-end'
    }
};