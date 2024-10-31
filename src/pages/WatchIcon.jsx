import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import "../assets/css/WatchIcon.css"
const WatchIcon = ({value}) => {
  return (
    <div>
      <Clock value={value} size={"20px"} className="mt-2" hourHandWidth={1}/>
    </div>
  );
};

export default WatchIcon;
