import React, { Component } from "react";
import { prop, compose, lensProp, view } from "ramda";
import styled from "styled-components";
import { Form, Input, Icon, Button } from "antd";
import login from "./services/login";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 400px;
  margin: 0 auto;
`;

const SubmitButton = styled(Button)`
  width: 100%;
`;

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const username = lensProp("username");
        compose(
          login,
          view(username)
        )(values).then(({ token }) => {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("username", view(username, values));
          this.props.history.push("/chat");
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Container>
        <Wrapper>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              <SubmitButton type="primary" htmlType="submit">
                Log in
              </SubmitButton>
            </Form.Item>
          </Form>
        </Wrapper>
      </Container>
    );
  }
}

export default Form.create({ name: "login" })(Login);
