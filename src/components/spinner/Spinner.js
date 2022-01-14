import './spinner.css';

const Spinner = ({ s }) => {
  return (
    <div
      className='spinner'
      style={{
        width: `${s}px`,
        height: `${s}px`,
      }}
    ></div>
  );
};

export default Spinner;
