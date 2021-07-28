import React, { Component } from "react";
import { Form,  Button,Input, Progress} from "antd";
import CommonComponents from "./CommonComponents"; 
import {Link,withRouter} from "react-router-dom"; 
import { ArrowLeftOutlined } from '@ant-design/icons';
import "./date.css";

class Birth extends Component {
  onFinish = (values) => {
    // this.props.nextStep();
    this.props.setBirth(values.dob);
    console.log("Success:", values);
    this.props.history.push("/step4")
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  

  render() {
    return (
      <div className="card shadow-lg" style={{ borderRadius: "25px" }}>
                <Progress percent={60} status="active" showInfo={true} className="pbar"/>

        <CommonComponents
          currentStep={this.props.currentStep}
          totalSteps={this.props.totalSteps}
          previousStep={this.props.previousStep}
        />
         <div className="p-2">
           <Link to="/step2" >
                    <Button type="primary" shape="circle"  >
                        <ArrowLeftOutlined className="anticon" />
                    </Button>
                    </Link>
                </div>
        <div className="d-flex" style={{ minHeight: "60vh" }}>
          <div
            className="card-body d-xl-flex justify-content-center align-items-center"
            align="center"
            style={{ paddingTop:"0px" }}
          >
            <Form
              name="basic"
              className="mywidth"
              onFinish={this.onFinish}
              initialValues={{
                dob: this.props.dob,
              }}
              onFinishFailed={this.onFinishFailed}
            >
              <h3>What is your Date of birth?</h3>
              <br />
              <h5>Birthday</h5>
              <Form.Item
                name="dob"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid Date of birth",
                  },
                  {
                    min:10,
                      max:10, message:'Max Length Of First Name Is 10 Characters'
                  }
                  
                ]}
              >
                <Input  
                  size="large"
                  placeholder="MM/DD/YYYY"
                  
                  type="date"
                />
               
              </Form.Item>
              {/* <Link to="/step4"> */}
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

export default withRouter(Birth);
