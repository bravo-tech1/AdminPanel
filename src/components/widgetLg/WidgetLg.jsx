import "./widgetLg.css";


import { useEffect, useState } from "react";

export default function WidgetLg() {
  const [data, setData] = useState([]);
  const [refresh,setRefresh] = useState(true)

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };



  const userData = data.slice(0, 6).map(item =>
  <>
    <tr className="widgetLgTr">
          <td className="widgetLgStatus">
            {item.name}
          </td>
          <td className="widgetLgStatus">
            {item.email}
          </td>
          <td className="widgetLgStatus">
          { item.accepted ? <Button type="Approved" /> : <Button type="Pending" /> }
          </td>
      </tr>
  </>
  )

  useEffect(()=>{
    fetch("https://test.emkanfinances.net/api/user/show")
      .then(res => res.json())
      .then(data => setData(data))
    },[refresh])
  
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">User</th>
          <th className="widgetLgTh">Email</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {userData}
        
      </table>
    </div>
  );
}
