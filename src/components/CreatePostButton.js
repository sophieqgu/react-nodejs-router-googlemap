import React, { Component } from 'react';
import { Modal, Button, message } from 'antd';

class CreatePostButton extends Component {
  state = {
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    console.log('Clicked Create')
  };

  handleCancel = () => {
    console.log('Cancelled');
    this.setState({
       visible: false,
    });
  };



  render () {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
         <Button type="primary" onClick={this.showModal}>
             Create New Post
         </Button>
         <Modal
             title="Create New Post"
             visible={visible}
             onOk={this.handleOk}
             okText='Create'
             onCancel={this.handleCancel}
             confirmLoading={confirmLoading}
         >
         </Modal>
      </div>
    )
  }
}

export default CreatePostButton;
