import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { API } from "aws-amplify";


const prefix = "https://luffysfightclub.s3.us-west-2.amazonaws.com/";

function App() {
  const [IMG_DATA, setIMG_DATA] = useState(null);
  useEffect(() => {
    if (IMG_DATA === null) {
      fetchImgData();
    }
  }, [])

  const fetchImgData = async () => {
    try {
      const res = await API.post('getS3AlbumPhotosApi', '/s3/album', { body: { album: "portrait/" } });
      console.log(res);
      setIMG_DATA(res);
    } catch (err) {
      console.log("err", err);
      console.log("error messsage = ", err.message);
      console.log("error response = ", err.response);
    }
  }
  return (
    <div className="App">
      {IMG_DATA && IMG_DATA.map((url, idx) => {
        console.log(url);
        return <img src={prefix + url.path} key={idx} width={"200px"} />
      })}
    </div>
  );
}

export default App;
