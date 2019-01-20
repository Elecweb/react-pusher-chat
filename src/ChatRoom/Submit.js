import React, { Component } from "react";
import { Input, Button } from "antd";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { compose } from "ramda";

const StyledInput = styled(Input)`
  margin-right: 16px !important;
`;

const Wrapper = styled.div`
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
`;

const Username = styled.p`
  margin: 0;
  margin-top: -4px;
  margin-right: 16px;
`;

class Submit extends Component {
  state = {
    value: ""
  };

  handleValueOnChange = event => {
    this.setValue(event.target.value);
  };

  setValue = value => {
    this.setState({
      value
    });
  };

  getValue = () => this.state.value;

  onSubmit = () => {
    this.props.store.messageService.addMessage(this.getValue());
    this.setValue("");
  };

  render() {
    return (
      <Wrapper>
        <Username>{sessionStorage.getItem("username")}</Username>
        <StyledInput
          placeholder="write message..."
          value={this.state.value}
          onChange={this.handleValueOnChange}
          onPressEnter={this.onSubmit}
        />
        <Button
          type="primary"
          icon="fire"
          onClick={this.onSubmit}
          loading={this.props.store.messageService.isFetching}
        >
          Send
        </Button>
      </Wrapper>
    );
  }
}

export default compose(
  inject("store"),
  observer
)(Submit);
