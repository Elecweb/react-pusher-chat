import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { map, compose, reverse } from "ramda";
import styled from "styled-components";
import { Comment, Tooltip, Icon } from "antd";
import moment from "moment";

const Wrapper = styled.div`
  height: calc(100vh - 120px);
  overflow: auto;
  background-color: #fafafa;
  padding: 16px;
  padding-bottom: 0;
`;

const StyledComment = styled(Comment)`
  .ant-comment-inner {
    padding: 4px 0;
  }
`;

class List extends Component {
  componentDidMount() {}

  render() {
    const { store } = this.props;
    return (
      <Wrapper>
        {compose(
          reverse,
          map(({ id, message, username, createdAt, isPrivate }) => (
            <StyledComment
              key={id}
              avatar={isPrivate ? <Icon type="meh" /> : null}
              author={<a>{username}</a>}
              content={<p>{message}</p>}
              datetime={
                <Tooltip
                  title={moment(createdAt).format("YYYY-MM-DD HH:mm:ss")}
                >
                  <span>{moment(createdAt).fromNow()}</span>
                </Tooltip>
              }
            />
          ))
        )(store.messages.getList())}
      </Wrapper>
    );
  }
}

export default compose(
  inject("store"),
  observer
)(List);
