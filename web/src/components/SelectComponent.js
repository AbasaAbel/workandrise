import React from 'react';
import Select from 'react-select';


export default ({
  data, name, handleIndustry, placeHolder,
}) => {
  const options = data.reduce((myArray, item) => {
    myArray.push({ value: Object.keys(item)[0], label: Object.keys(item)[0] });
    return myArray;
  }, []);

  return (
    <React.Fragment>
      <Select
        defaultValue="All"
        isMulti
        name={name}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleIndustry}
        placeholder={placeHolder}
      />
    </React.Fragment>
  );
};
