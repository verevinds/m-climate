import { Story } from '@storybook/react/types-6-0';
import React from 'react';

import Button, { ButtonProps } from './Button';

// This default export determines where your story goes in the story list
export default {
  title: 'Button',
  component: Button,
};

const Template: Story<ButtonProps> = args => <Button {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  children: 'hellow',
  type: 'button',
};
