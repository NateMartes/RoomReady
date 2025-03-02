import styles from "./Header.module.css"

function Header() {
  return (
    <div className={styles.headerDiv}>
      <h1>Stay safe. Stay prepared. Get&nbsp;Room-Ready.</h1>
      <p className={styles.headerSummary}>Room-Ready is a web-based weather preparedness tool that helps users determine if their location is ready for upcoming severe weather.
By simply snapping a picture, Room-Ready gathers weather data based on your location and assesses your surroundings to provide insights on potential weather risks. By using Gemini's API to asses the risks through various other API calls.</p>
    </div>
  );
}

export default Header;

