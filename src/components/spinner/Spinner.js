import './spinner.css';

const Spinner = ({ s, color }) => {
  return (
    <div
      className='spinner'
      style={{
        width: `${s}px`,
        height: `${s}px`,
        borderTopColor: color ? color : '#e94747',
      }}
    ></div>
  );
};

export default Spinner;
