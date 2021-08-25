import React, { useState, Fragment, useEffect } from "react";
import CSS from "csstype";
import logo from "./logo.svg";
import "./App.css";
import { Basic } from "react-dial-knob";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Typography } from "@material-ui/core";


import Tempo from "./Tempo";
import { samplers, percussions } from "./Percussions";

const useStyle = makeStyles((theme) => ({
  baseGridRoot: {
    position: "relative",
    padding: "20px",
  },
  sequencerRoot: {
    position: "relative",
    top: "350px",
    left: "200px",
  },
}));

const buttonStyle: CSS.Properties = {};

const machineBack: CSS.Properties = {
  backgroundColor: "beige",
  position: "relative",
  display: "block",
  top: "150px",
  bottom: 0,
  left: "150px",
  right: 0,
  height: "600px",
  width: "1600px",
};

const sequencerRoot: CSS.Properties = {
  position: "relative",
  top: "150px",
  left: "250px",
  width: "1000px",
};

const percussionRoot: CSS.Properties = {
  position: "relative",
  top: "20px",
  left: "20px",
  width: "2000px",
  height: "150px",
};

const instrumentDivRoot: CSS.Properties = {
  width: "max-content",
  height: "150px",
  textAlign: "center",
  borderLeftStyle: "solid",
  borderRightStyle: "solid",
};

function App() {
  const classes = useStyle();
  const [value, setValue] = useState(0);
  const [levelValues, setLevelValues] = useState({
    bass_drum: samplers["bass_drum"].volume.value,
    snare: samplers["snare"].volume.value,
    low_tom: samplers["low_tom"].volume.value,
    mid_tom: samplers["mid_tom"].volume.value,
    hi_tom: samplers["hi_tom"].volume.value,
    rim: samplers["rim"].volume.value,
    clap: samplers["clap"].volume.value,
    cl_hihat: samplers["cl_hihat"].volume.value,
    op_hihat: samplers["op_hihat"].volume.value,
    crash: samplers["crash"].volume.value,
    ride: samplers["ride"].volume.value
  });
  const [tempoValue, setTempoValue] = useState(100);
  const [running, setRunning] = useState(false);
  const [action, setAction] = useState("");
  const [instrument, setInstrument] = useState("");

  const handleInstrument = (act: string, inst: string) => {
    if(inst === instrument) {
      setAction("");
      setInstrument("");
    } else {
      setAction(act);
      setInstrument(inst);
    }
  }

  const handleValueChange = (val: number) => {
    setValue(val);
  };

  const handleClickStart = () => {
    setAction("");
    setInstrument("");
    setRunning(!running);
  };

  const renderPercussion = () => {
    return percussions.map((percussion) => {
      return (
        <Grid container item xs={1}>
          <div style={instrumentDivRoot}>
            <Typography variant="h6">{percussion["label"]}</Typography>
            <Grid container item alignContent="center" alignItems="center">
              {percussion["knobs"].map((knob, k) => {
                return (
                  <Grid item xs={percussion["knobs"].length > 1 ? 6 : 12}>
                    <Basic
                      diameter={40}
                      min={-10.0}
                      max={10.0}
                      step={1}
                      value={levelValues[knob["key"]]}
                      theme={{
                        defaultColor: "#333",
                        activeColor: "#f33",
                      }}
                      onValueChange={(val) => adjustLevel(val, knob["key"])}
                      ariaLabelledBy={knob + "-label"}
                    />
                    <Typography variant="caption">{knob["label"]}</Typography>
                  </Grid>
                );
              })}
            </Grid>
            {percussion["label"] !== "Total accent" ? (
              percussion["percussion"] === 2 ? (
                <Fragment>
                  <button onClick={() => handleInstrument("step_sound", percussion["value"][0])}>{percussion["button_labels"][0]}</button>
                  <button onClick={() => handleInstrument("step_sound", percussion["value"][1])}>{percussion["button_labels"][1]}</button>
                </Fragment>
              ) : (
                <button onClick={() => handleInstrument("step_sound", percussion["value"])}>{percussion["label"]}</button>
              )
            ) : null}
          </div>
        </Grid>
      );
    });
  };

  const handleTempoChange = (val: number) => {
    setTempoValue(val);
  }

  const adjustLevel = (volumeValue: number, percussion: string ) => {
    console.log(samplers[percussion].volume.value)
    switch (percussion) {
      case "bass_drum": setLevelValues({
        ...levelValues,
        bass_drum: volumeValue
      }); 
      break;
      case "snare": setLevelValues({
        ...levelValues,
        snare: volumeValue
      }); 
      break;
      case "low_tom": setLevelValues({
        ...levelValues,
        low_tom: volumeValue
      }); 
      break;
      case "mid_tom": setLevelValues({
        ...levelValues,
        mid_tom: volumeValue
      }); 
      break;
      case "hi_tom": setLevelValues({
        ...levelValues,
        hi_tom: volumeValue
      }); 
      break;
      case "cl_hihat": setLevelValues({
        ...levelValues,
        cl_hihat: volumeValue
      }); 
      break;
      case "op_hihat": setLevelValues({
        ...levelValues,
        op_hihat: volumeValue
      }); 
      break;
      case "clap": setLevelValues({
        ...levelValues,
        clap: volumeValue
      }); 
      break;
      case "rim": setLevelValues({
        ...levelValues,
        rim: volumeValue
      }); 
      break;
      case "ride": setLevelValues({
        ...levelValues,
        ride: volumeValue
      }); 
      break;
      case "crash": setLevelValues({
        ...levelValues,
        crash: volumeValue
      }); 
      break;
    }
    samplers[percussion].volume.value = volumeValue;   
  }

  const getLevel = (percussion: string): number => {
    return levelValues[percussion];
  }

  return (
    <div style={{ position: "relative" }}>
      <Box m={2} style={machineBack}>
        <Grid
          classes={{ container: classes.baseGridRoot }}
          container
          spacing={4}
        >
          <div style={percussionRoot}>
            <Grid
              alignItems="stretch"
              alignContent="stretch"
              container
              item
              xs={12}
              spacing={4}
            >
              {renderPercussion()}
            </Grid>
          </div>
          <div style={sequencerRoot}>
            <button onClick={handleClickStart}>Start</button>
            <Basic
              diameter={40}
              min={80}
              max={200}
              step={1}
              value={tempoValue}
              theme={{
                defaultColor: "#333",
                activeColor: "#f33",
              }}
              onValueChange={handleTempoChange}
              ariaLabelledBy={"tempo-label"}
            />
            <Fragment><Tempo percussions={samplers} tempo={tempoValue} running={running} action={action} instrument={instrument}/></Fragment>
          </div>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
