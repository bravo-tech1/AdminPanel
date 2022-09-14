import "./home.css";


import WidgetLg from "../../components/widgetLg/WidgetLg";

export default function Home() {
  return (
    <div className="home">
      <div className="homeWidgets">
        <WidgetLg/>
      </div>
    </div>
  );
}
