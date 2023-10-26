import './Monitor.css';
import '../../node_modules/dracula-ui/styles/dracula-ui.css';

const tempColor = {
  cold: 'var(--cyan)',
  normal: 'var(--green)',
  warm: 'var(--orange)',
  hot: 'var(--red)'
};

function Monitor(props) {

  let myStyles = {
    color: tempColor.normal,
    textShadow: `0 0 8px ${tempColor.normal}`
  };

  if(props.temperature < 20) {
    myStyles.color = tempColor.cold;
    myStyles.textShadow = `0 0 8px ${tempColor.cold}`;
  }
  else if(props.temperature >= 20 && props.temperature < 30) {
    myStyles.color = tempColor.normal;
    myStyles.textShadow = `0 0 8px ${tempColor.normal}`;
  }
  else if(props.temperature >= 30 && props.temperature < 40) {
    myStyles.color = tempColor.warm;
    myStyles.textShadow = `0 0 8px ${tempColor.warm}`;
  }
  else {
    myStyles.color = tempColor.hot;
    myStyles.textShadow = `0 0 8px ${tempColor.hot}`;
  }

  return(
    <>
    <div className="display-container">
      <div className="display drac-bg-grey">
        <span className="temperature" style={myStyles}>
          {props.temperature}°C
        </span>
      </div>
    </div>
    </>
  );
}

export default Monitor;