import React, { useState, Fragment, useEffect } from "react";
import * as Tone from "tone";
import CSS from "csstype";
import logo from "./logo.svg";
import "./App.css";
import { Basic } from "react-dial-knob";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles, Typography } from "@material-ui/core";
import MusicNoteIcon from '@material-ui/icons/MusicNote';

import Tempo from "./Tempo";
import Midsection from "./Midsection";
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
  const [clearValue, setClearValue] = useState(false);

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

  const handleClearValues = () => {
    setClearValue(!clearValue)
  }

  const renderPercussion = () => {
    return percussions.map((percussion: Types.Perc) => {
      return (
        <div style={instrumentDivRoot}>
          <Typography variant="h6">{percussion["label"]}</Typography>
          <Grid container item alignContent="center" alignItems="center">
            {percussion["knobs"].map((knob: Types.Knobs, k: number) => {
              return (
                <Grid key={percussion.label+"-"+knob.type} item xs={percussion["knobs"].length > 1 ? 6 : 12}>
                  <Basic
                    key={knob.type}
                    diameter={30}
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
      );
    });
  };

  const handleTempoChange = (val: number) => {
    setTempoValue(val);
  }

  return (
    <div style={machineBack}>
      <Grid
        classes={{ container: classes.baseGridRoot }}
        container
        spacing={4}
      >
        <Grid container item xs={12} justifyContent="space-between">
          <Typography variant="h1">Kontra Sequencer 909</Typography>
          <Typography variant="h2">Rhythm Composer</Typography> 
        </Grid>
        <Grid
          container
          item
          xs={12}
          spacing={4}
          justifyContent="space-between"
        >
          {renderPercussion()}
        </Grid>
        <Midsection
          tempoValue={tempoValue}
          stepsValue={stepsValue}
          handleClickStart={handleClickStart}
          handleTempoChange={handleTempoChange}
          handleStepsCount={handleStepsCount}
        />
        <Grid 
          container 
          spacing={4} 
          item 
          xs={12}
          justifyContent="space-around"
        >
          <Grid classes={{ container: classes.controlDivRoot }} container item xs={2} spacing={2}>
              <Grid item>
                <Button variant="contained" color="secondary">{"Scale"}</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary">{"Shift"}</Button>
              </Grid>
              <Grid item>
                <Button onClick={handleClearValues} variant="contained" color="secondary">{"Clear"}</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary">{"Last Step"}</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary">{"Shuffle/Flam"}</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary">{"Instrument Select"}</Button>
              </Grid>
          </Grid>
          <Grid container item xs={10}>
            <Tempo 
              percussions={samplers} 
              attackValue={attackValue} 
              decayValues={decayValues} 
              tempo={tempoValue}
              stepsValue={stepsValue} 
              running={running} 
              action={action} 
              instrument={instrument}
              clearValue={clearValue}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

const useStyle = makeStyles((theme) => ({
  baseGridRoot: {
    display: "flex",
    alignContent: "center",
    margin: "auto",
    width: "60%"
  },
  controlDivRoot: {
    display: "flex",
    borderRadius: "2px",
    borderStyle: "solid"
  }
}));

const buttonStyle: CSS.Properties = {};

const machineBack: CSS.Properties = {
  position: "absolute", 
  height: "100%", 
  width: "100%",
  backgroundColor: "beige",
  display: "flex",
};



const instrumentDivRoot: CSS.Properties = {
  textAlign: "center",
  borderLeftStyle: "solid",
  borderRightStyle: "solid",
};