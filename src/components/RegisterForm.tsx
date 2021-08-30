import { RefObject, useState } from 'react';
import { Form, FormInstance, Input, Button } from 'antd';
import axios from "axios";

type RegisterFormProps = {
  onSuccess: () => void,
  formRef?: RefObject<FormInstance>,
};

function RegisterForm ({ onSuccess, formRef }: RegisterFormProps) {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [serverErrMsg, setServerErrMsg] = useState<string>('');
  
    const onFinish = (values: Record<string, string>) => {
      setSubmitting(true);
      axios.post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', {
        name: values.fullname,
        email: values.email,
      })
      .then(res => {
        setSubmitting(false);
        onSuccess && onSuccess();
      })
      .catch(error => {
        setServerErrMsg(error.response.data.errorMessage);
        setSubmitting(false);
      });
    };
  
    return (
      <Form
        name="basic"
        ref={formRef}
        initialValues={{
          fullname: '',
          email: '',
          confirmedEmail: '',
        }}
        onFinish={onFinish}
      >
        <h2>Request an invite</h2>
  
        <Form.Item
          name="fullname"
          rules={[
            { required: true, message: 'Please input your full name!' },
            { min: 3, message: 'Full name needs to be at least 3 characters long!' }
          ]}
        >
          <Input placeholder="Full name" />
        </Form.Item>
  
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>
  
        <Form.Item
          name="confirmedEmail"
          rules={[{ required: true, message: 'Please confirm your email!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('email') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Confirm Email needs to match Email!'));
            },
          })]}
        >
          <Input type="email" placeholder="Confirm Email" />
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submitting} block>
            {submitting ? 'Sending, please wait...' : 'Send'}
          </Button>
        </Form.Item>
        
        {serverErrMsg && <div>{serverErrMsg}</div>}
      </Form>
    );
  }

  export default RegisterForm;