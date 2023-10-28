import './Monitor.css';
import '../../node_modules/dracula-ui/styles/dracula-ui.css';

const tempColor = {
  cold: 'var(--cyan)',
  normal: 'var(--green)',
  warm: 'var(--orange)',
  hot: 'var(--red)'
};

function Monitor(props) {

  let myStyles = {};

  if(props.temperature < 20) {
    myStyles.color = tempColor.cold;
  }
  else if(props.temperature >= 20 && props.temperature < 30) {
    myStyles.color = tempColor.normal;
  }
  else if(props.temperature >= 30 && props.temperature < 40) {
    myStyles.color = tempColor.warm;
  }
  else {
    myStyles.color = tempColor.hot;
  }

  return(
    <>
      <div className="display drac-bg-grey">
        <span className="temperature" style={myStyles}>
          {props.temperature}°C
        </span>
      </div>
    </>
  );
}

export default Monitor;