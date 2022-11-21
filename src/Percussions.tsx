import * as Tone from "tone";
import { Types } from "./types";
export {
  samplers,
  percussions
  // pitchShift
} 

const comp = new Tone.Compressor(-30, 3);

// const pitchShift: Types.pitchShift = {
//   bass_drum: new Tone.PitchShift().toDestination(),
//   snare: new Tone.PitchShift().toDestination(),
//   low_tom: new Tone.PitchShift().toDestination(),
//   mid_tom: new Tone.PitchShift().toDestination(),
//   hi_tom: new Tone.PitchShift().toDestination(),
//   crash: new Tone.PitchShift().toDestination(),
//   ride: new Tone.PitchShift().toDestination()
// }

const samplers: Types.samples = {
    bass_drum: new Tone.Player(process.env.PUBLIC_URL+"/909_samples/bd01.wav").toDestination(),
    bass_drum2: new Tone.Player("http://localhost:3005/sounds/15").toDestination(),
    snare: new Tone.Player(process.env.PUBLIC_URL+"/909_samples/sd02.wav").toDestination(),
    cl_hihat: new Tone.Player(process.env.PUBLIC_URL+"/909_samples/hh03.wav").toDestination(),
    op_hihat: new Tone.Player(process.env.PUBLIC_URL+"/909_samples/oh01.wav").toDestination(),
    low_tom: new Tone.Player(process.env.PUBLIC_URL+"/909_samples/lt04.wav").toDestination(),
    mid_tom: new Tone.Player(process.env.PUBLIC_URL+"/909_samples/mt04.wav").toDestination(),
    hi_tom: new Tone.Player(process.env.PUBLIC_URL+"/909_samples/ht04.wav").toDestination(),
    crash: new Tone.Player(process.env.PUBLIC_URL+"/909_samples/cr01.wav").toDestination(),
    ride: new Tone.Player(process.env.PUBLIC_URL+"/909_samples/rd01.wav").toDestination(),
    rim: new Tone.Player(process.env.PUBLIC_URL+"/909_samples/rs01.wav").toDestination(),
    clap: new Tone.Player(process.env.PUBLIC_URL+"909_samples/cp01.wav").toDestination()
  }

const percussions: Types.Perc[] = [
      // { 
      //   label: "Total accent", 
      //   value: ["accent"], 
      //   knobs: [{label: "Accent", type: "accent", key: "accent"}] ,
      //   percussion: 1,
      //   button_labels: []
      // },
      { 
        label: "Bass drum", 
        value: ["bass_drum"], 
        knobs: [
          { 
            label: "Tune", 
            type: "tune", 
            key: "bass_drum"
          }, 
          { 
            label: "Level",
            type: "level", 
            key: "bass_drum"
          }, 
          { 
            label: "Attack",
            type: "attack",  
            key: "bass_drum"
          }, 
          { 
            label: "Decay",
            type: "decay",  
            key: "bass_drum"
          }
        ],
        percussion: 1,
        button_labels: [] 
      },
      { 
        label: "Snare drum", 
        value: ["snare"], 
        knobs: [
          { 
            label: "Tune",
            type: "tune",
            key: "snare"
          }, 
          { 
            label: "Level",
            type: "level", 
            key: "snare"
          }, 
          {
            label: "Tone",
            type: "tone", 
            key: "snare"
          }, 
          {
            label: "Snappy",
            type: "snappy", 
            key: "snare"
          }
        ],
        percussion: 1,
        button_labels: []  
      },
      { 
        label: "Low tom", 
        value: ["low_tom"], 
        knobs: [{ label: "Tune", type: "tune", key: "low_tom"}, { label: "Level", type: "level", key: "low_tom"}, { label: "Decay", type: "decay", key: "low_tom"}],
        percussion: 1,
        button_labels: [] 
      },
      { 
        label: "Mid tom", 
        value: ["mid_tom"], 
        knobs: [{ label: "Tune", type: "tune", key: "mid_tom"}, { label: "Level", type: "level", key: "mid_tom"}, { label: "Decay", type: "decay", key: "mid_tom"}],
        percussion: 1,
        button_labels: [] 
      },
      { 
        label: "Hi tom", 
        value: ["hi_tom"], 
        knobs: [{ label: "Tune", type: "tune", key: "hi_tom"}, { label: "Level", type: "level", key: "hi_tom"}, { label: "Decay", type: "decay", key: "hi_tom"}],
        percussion: 1,
        button_labels: [] 
      },
      { 
        label: "Rim", 
        value: ["rim"], 
        knobs: [{ label: "Level", type: "level", key: "rim"}],
        percussion: 1,
        button_labels: [] 
      },
      { 
        label: "Clap", 
        value: ["clap"], 
        knobs: [{ label: "Level", type: "level", key: "clap"}] ,
        percussion: 1,
        button_labels: [] 
      },
      {
        label: "Hi-hat",
        value: ["cl_hihat", "op_hihat"],
        knobs: [{ label: "Level", type: "level", key: "cl_hihat"}, { label: "Level", type: "level", key: "op_hihat"}, { label: "CH decay", type: "decay", key: "cl_hihat"}, { label: "OH decay", type: "decay", key: "op_hihat"}],
        percussion: 2,
        button_labels: ["Closed Hi-hat", "Open Hi-hat"],
      },
      {
        label: "Cymbal",
        value: ["crash", "ride"],
        knobs: [{ label: "Level",  type: "level", key: "crash"}, { label: "Level",  type: "level", key: "ride"}, { label: "Crash tune",  type: "tune", key: "crash"}, { label: "Ride tune",  type: "tune", key: "ride"}],
        percussion: 2,
        button_labels: ["Crash", "Ride"],
      },
    ];