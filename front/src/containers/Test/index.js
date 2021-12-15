import React, { useEffect, useState } from 'react';

import { Input } from 'antd';

import { BaseButton, Text } from '@components';

import { camelTypography } from '@styles';

export const Test = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [text, setText] = useState('');

  const onChangeText = e => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (text) {
      setIsComplete(true);
    }
  }, [text]);

  return (
    <>
      <Input value={text} onChange={onChangeText} />
      <BaseButton
        style={{ ...camelTypography.h1 }}
        isComplete={isComplete}
        htmlType={'submit'}>
        {'로그인'}
      </BaseButton>
      <Text underline>안녕</Text>
    </>
  );
};
