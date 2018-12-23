import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import './LoaderButton.css';

const btn = { backgroundColor: '#fd6360', color: 'white', borderRadius: '40px' };
export default ({
  isLoading,
  text,
  loadingText,
  className = '',
  disabled = false,
  ...props
}) => (
  <Button
    // eslint-disable-next-line
    className={'LoaderButton ${className}'}
    disabled={disabled || isLoading}
    style={btn}
    {...props}
  >
    {isLoading && <Glyphicon glyph="refresh" className="spinning" />}
    {!isLoading ? text : loadingText}
  </Button>
);
