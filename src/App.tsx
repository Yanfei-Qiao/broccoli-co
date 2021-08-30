import { useState, useRef, useEffect } from 'react';
import { Button, Modal, FormInstance } from 'antd';
// import { FormInstance } from 'antd/es/form';
import './App.scss';
import InvitedSuccessContent from './components/InvitedSuccessContent';
import RegisterForm from './components/RegisterForm';

function App() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isInviteSuccess, setIsInviteSuccess] = useState<boolean>(false);
  const formRef = useRef<FormInstance>(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModel = () => {
    setIsModalVisible(false);
  };

  const resetInviteInfo = () => {
    setIsInviteSuccess(false);
    hideModel();
  }

  useEffect(() => {
    if(isModalVisible) {
      formRef.current?.resetFields();
    }
  }, [isModalVisible]);

  return (
    <div className="App">
      <header>
        <div className="content">BROCCOLI & CO</div>
      </header>
      <main>
        <div className="content">
          <h1>A better way to enjoy every day.</h1>
          <h2>Be the first to know when we launch.</h2>
          <Button onClick={showModal}>Request an invite</Button>
        </div>
      </main>
      <footer>
        <div className="content">
          <div>Made with 🖤 in Melbourne</div>
          <div>&copy; 2016 Broccoli & Co. All rights reserved.</div>
        </div>
      </footer>
      <Modal
        title={null}
        footer={null}
        closable={false}
        visible={isModalVisible}
        onCancel={hideModel}>
        { !isInviteSuccess ?
          <RegisterForm formRef={formRef} onSuccess={() => setIsInviteSuccess(true)}/> :
          <InvitedSuccessContent onOkClick={resetInviteInfo} /> }
      </Modal>
    </div>
);
}

export default App;
