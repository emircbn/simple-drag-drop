import * as React from 'react';

const TextInput: React.FC<any> = ({ value, onChange }) => {
  const id = React.useId();
  const [isFocus, setIsFocus] = React.useState<boolean>(false);

  const onFocus = () => {
    setIsFocus(true);
  };

  const onBlur = () => {
    setIsFocus(false);
  };

  return (
    <div onClick={onFocus}>
      <input
        id={id}
        type="text"
        autoFocus={isFocus}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        style={{ display: !isFocus ? 'none' : undefined }}
      />
      <label htmlFor={id} style={{ display: isFocus ? 'none' : undefined }}>{value}</label>
    </div>
  );
};

export default TextInput;
