import React from 'react';
import { ScrollView } from 'react-native';

import { TextField, ErrorText } from '../components/Form';
import { Button } from '../components/Button';

export default () => (
  <ScrollView contentContainerStyle={{ paddingVertical: 20}}>
    <TextField label="Email" placeholder="john.doe@example.com" />
    <TextField label="Password" secureTextEntry />
    <ErrorText text="" />
    <Button text="Submit" />
  </ScrollView>
);
