import { TextField, Typography } from "@mui/material";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import { useState } from "react";

import { getGeocode, getLatLng } from "use-places-autocomplete";

const center = { lat: 48.8584, lng: 2.2945 };

function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_SECRET_NAME,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);

  const [select, setselect] = useState(null);
  const [address, setaddress] = useState(null);

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  const handleSelect = async (e) => {
    setaddress(e.target.value);

    console.log(address);

    const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]);
    setselect({ lat, lng });
    console.log(results);
  };

  return (
    <>
      <div style={{ width: "390px", height: "120px", marginTop: "1rem" }}>
        <GoogleMap
          center={select ? select : center}
          zoom={15}
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            borderRadius: "15px",
          }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          {select && <Marker position={select} />}
        </GoogleMap>
        <Typography variant="subtitle1" fontSize="14px">
          or select locations
        </Typography>
      </div>
      <div onSelect={handleSelect}>
        <Autocomplete>
          <TextField
            placeholder="Continent-city"
            type="text"
            size="small"
            sx={{
              width: "350px",
              mt: "2rem",
            }}
            // onChange={(e) => {
            //   setvalue(e.target.value);
            //   value = { value };
            // }}
          />
        </Autocomplete>
      </div>
    </>
  );
}

export default Map;
