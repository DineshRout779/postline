import './spinner.css';

const Spinner = ({ s, color = '#e94747', border = '#302931' }) => {
  return (
    <div
      className='spinner'
      style={{
        width: `${s}px`,
        height: `${s}px`,
        borderColor: border,
        borderTopColor: color,
      }}
    ></div>
  );
};

export default Spinner;
