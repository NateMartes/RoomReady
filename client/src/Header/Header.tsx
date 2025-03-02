import styles from "./Header.module.css"

function Header() {
  return (
    <div className={styles.headerDiv}>
      <h1>Stay safe. Stay prepared. Get&nbsp;RoomReady.</h1>
      <p className={styles.headerSummary}>
RoomReady is a web-based weather preparedness tool that helps users determine if their location is ready for upcoming severe weather. 
By simply uploading a picture, RoomReady gathers weather data based on your location and assesses your surroundings to provide insights on potential weather risks. 
We use Generative AI models and U.S. government weather data to better  determine risks in locations and possible hazardous weather along with that.</p>
    </div>
  );
}

export default Header;

