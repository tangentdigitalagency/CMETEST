import React, { Component, useState} from "react";
import { Form, Button, Input, Select, Progress, Col, Row } from "antd";
import CommonComponents from "./CommonComponents";
import { Link, withRouter } from "react-router-dom";
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from "axios";
import XMLParser from 'react-xml-parser';




class Info extends Component {

  state = { 
    error: '',
    loading: false,
    response: '',
  }

  onFinish = (values) => {

    // this.props.nextStep();
    this.props.setFName(values.first_name);
    this.props.setLName(values.last_name);
    this.props.setEmail(values.email)
    this.props.setPhone(values.phone)

    console.log("Success:", values);
    this.setState({
      loading: true 
    }, this.PostDataOfLifeInsurance(this.props.postData));
    this.props.history.push("/thank-you-commercial")
  };


  PostDataOfLifeInsurance = (postData) => {
    console.log(postData);

    axios.post("https://quotehound.leadspediatrack.com/post.do", null, {
      params: postData,
    })

    .then((res) => {
      console.log(res)

      if (res.status === 200) {
        this.setState({
          loading: false, 
        },() =>{
          this.props.nextStep();

          this.props.callMediaAlpha();
        });
      }
    })

    .catch((err) => {
      if(err) throw err;
    });
  };


  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    
    const {response, loading} = this.state
    return (
      <div className="card shadow-lg" style={{ borderRadius: "25px" }}>
        <Progress percent={62.5} status="active" showInfo={false} className="pbar" />
        <CommonComponents
          currentStep={this.props.currentStep}
          totalSteps={this.props.totalSteps}
          previousStep={this.props.previousStep}
        />
        <div className="p-2">
          <Link to="/step4">
            <Button type="primary" shape="circle"  >
              <ArrowLeftOutlined className="anticon" />
            </Button>
          </Link>
        </div>
        <div className="d-flex" style={{ minHeight: "60vh" }}>
          <div
            className="card-body d-xl-flex justify-content-center align-items-center"
            align="center"
            style={{ paddingTop: "0px" }}
          >
            <Form
              name="basic"
              className="mywidth"
              onFinish={this.onFinish}
              initialValues={{
                first_name: this.props.first_name,
                last_name: this.props.last_name,
                email: this.props.email,
                phone: this.props.phone
              }}
              onFinishFailed={this.onFinishFailed}
            >
              <h3>What is your information</h3>
              <br />

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="first_name"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Your First Name",
                      },
                      {
                        min: 2, message: 'Please enter your name'
                      }
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="First name"
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="last_name"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Your Last Name",
                      },
                      {
                        min: 2, message: 'Please enter your name'
                      }
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Last Name"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please Enter a valid email",
                      }
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Email"
                      type="email"
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="phone"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please Enter A Valid Phone",
                      },
                      {
                        max: 12, message: 'Please enter a valid phone'
                      }
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Phone Number"
                      type='text'
                      id="phone"
                    > 
      
                    </Input>
                  </Form.Item>
                </Col>
              </Row>


              {/* <Link to="/step6"> */}
              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large">
                  Next
                </Button>
              </Form.Item>
              {/* </Link> */}
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Info);
