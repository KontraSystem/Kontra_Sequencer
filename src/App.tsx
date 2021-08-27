import React, { useState, Fragment, useEffect } from "react";
import * as Tone from "tone";
import CSS from "csstype";
import logo from "./logo.svg";
import "./App.css";
import { Basic } from "react-dial-knob";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Typography } from "@material-ui/core";


import Tempo from "./Tempo";
import { samplers, percussions } from "./Percussions";
import { Types } from "./types";

function App() {
  const classes = useStyle();
  const [value, setValue] = useState(0);
  const [levelValues, setLevelValues] = useState<Types.KnobLevels>({
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


  const [decayValues, setDecayValues] = useState<Types.KnobDecay>({
    bass_drum: 1000,
    low_tom: 1000,
    mid_tom: 1000,
    hi_tom: 1000,
    cl_hihhat: 1000,
    op_hihat: 1000
  });

  const [tuneValues, setTuneValues] = useState<Types.KnobTune>({
    bass_drum: 0,
    snare: 0,
    low_tom: 0,
    mid_tom: 0,
    hi_tom: 0
  });

  const [toneValue, setToneValue] = useState<Types.KnobTone>({
    bass_drum: 0
  });

  const [snappyValue, setSnappyValue] = useState<Types.KnobSnappy>({
    bass_drum: 0
  });

  const [attackValue, setAttackValue] = useState<Types.KnobAttack>({
    bass_drum: 0
  });

  const [tempoValue, setTempoValue] = useState(100);
  const [stepsValue, setStepsValue] = useState(16);
  const [running, setRunning] = useState(false);
  const [action, setAction] = useState("");
  const [instrument, setInstrument] = useState("");

  const adjustLevel = (volumeValue: number, percussion: string ) => {
      setLevelValues({
        ...levelValues,
        [percussion]: volumeValue
      }); 
    samplers[percussion].volume.value = volumeValue;   
  }

  const adjustDecay = (decayValue: number, percussion: string) => {
    setDecayValues({
        ...decayValues,
        [percussion]: decayValue
    }); 
  }

  const adjustTune = (tuneValue: number, percussion: string) => {
    // setTuneValues({
    //   ...tuneValues,
    //   [percussion]: tuneValue
    // }); 
    // pitchShift[percussion].pitch = tuneValue;
  }

  const adjustTone = (decayValue: number, percussion: string) => {

  }

  const adjustSnappy = (decayValue: number, percussion: string) => {

  }
  
  const adjustAttack = (attackValue: number, percussion: string) => {
    setAttackValue({ bass_drum: attackValue })
  }
  const knobTypes: Types.KnobTypes = {
    level: { function: adjustLevel, value:levelValues, max: 10, min: -10 },
    decay: { function: adjustDecay, value:decayValues, max: 1000, min: 0 },
    tune: { function: adjustTune, value: tuneValues, max: 24, min: -24 },
    tone: { function: adjustTone, value: toneValue, max: 10, min: -10 },
    snappy: { function: adjustSnappy, value: snappyValue, max: 10, min: -10 },
    attack: { function: adjustAttack, value: attackValue, max: 20, min: 0 }
  }

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

  const handleStepsCount = (val: number) => {
    setStepsValue(val)
  }

  const renderPercussion = () => {
    return percussions.map((percussion: Types.Perc) => {
      return (
        <Grid container item xs={1}>
          <div style={instrumentDivRoot}>
            <Typography variant="h6">{percussion["label"]}</Typography>
            <Grid container item alignContent="center" alignItems="center">
              {percussion["knobs"].map((knob: Types.Knobs, k: number) => {
                return (
                  <Grid key={percussion.label+"-"+knob.type} item xs={percussion["knobs"].length > 1 ? 6 : 12}>
                    <Basic
                      key={knob.type}
                      diameter={40}
                      min={knobTypes[knob.type].min}
                      max={knobTypes[knob.type].max}
                      step={1}
                      value={knobTypes[knob.type].value[knob.key]}
                      theme={{
                        defaultColor: "#333",
                        activeColor: "#f33",
                      }}
                      onValueChange={(val) => knobTypes[knob.type]["function"](val, knob.key)}
                      ariaLabelledBy={knob + "-label"}
                      jumpLimit={0.5}
                    />
                    <Typography key={percussion.label} variant="caption">{knob["label"]}</Typography>
                  </Grid>
                );
              })}
            </Grid>
            {percussion["label"] !== "Total accent" ? (
              percussion["percussion"] === 2 ? (
                <Fragment>
                  <button onClick={() => handleInstrument("step_sound", percussion.value[0])}>{percussion.button_labels[0]}</button>
                  <button onClick={() => handleInstrument("step_sound", percussion.value[1])}>{percussion.button_labels[1]}</button>
                </Fragment>
              ) : (
                <button onClick={() => handleInstrument("step_sound", percussion.value[0])}>{percussion.label}</button>
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
            <Grid container>
              <Grid item>
                <button onClick={handleClickStart}>Start</button>
              </Grid>
              <Grid item>
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
                  jumpLimit={0.5}
                  ariaLabelledBy={"tempo-label"}
                />
                <Typography variant="caption">{"BPM"}</Typography>
              </Grid>
              <Grid item>
                <Basic
                  diameter={40}
                  min={0}
                  max={16}
                  step={1}
                  value={stepsValue}
                  theme={{
                    defaultColor: "#333",
                    activeColor: "#f33",
                  }}
                  onValueChange={handleStepsCount}
                  jumpLimit={0.5}
                  ariaLabelledBy={"steps-label"}
                />
                <Typography  variant="caption">{"Steps"}</Typography>
              </Grid>
              <Grid item>
                <Basic
                  diameter={40}
                  min={0}
                  max={16}
                  step={1}
                  value={stepsValue}
                  theme={{
                    defaultColor: "#333",
                    activeColor: "#f33",
                  }}
                  onValueChange={handleStepsCount}
                  jumpLimit={0.5}
                  ariaLabelledBy={"steps-label"}
                />
                <Typography  variant="caption">{"Swing"}</Typography>
              </Grid>
            </Grid>
            <Tempo 
              percussions={samplers} 
              attackValue={attackValue} 
              decayValues={decayValues} 
              tempo={tempoValue}
              stepsValue={stepsValue} 
              running={running} 
              action={action} 
              instrument={instrument}
            />
          </div>
        </Grid>
      </Box>
    </div>
  );
}

export default App;

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
  left: "50px",
  right: 0,
  height: "600px",
  width: "1700px",
};

const sequencerRoot: CSS.Properties = {
  position: "relative",
  top: "250px",
  left: "10px",
  width: "2000px",
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