// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { Form, Button, Modal } from 'antd';
import './App.scss';
import InvitedSuccessContent from './components/InvitedSuccessContent';
import RegisterForm from './components/RegisterForm';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInviteSuccess, setIsInviteSuccess] = useState(false);
  const formRef = useRef<any>(null);
  const [form] = Form.useForm();

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
    if(!isModalVisible) {
      form.resetFields();
      // console.log(formRef.current)
      // formRef.current && formRef.current.setFieldsValue();
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
