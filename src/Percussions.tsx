import * as Tone from "tone";

export {
  samplers,
  percussions
} 

const samplers = {
    bass_drum: new Tone.Player(process.env.PUBLIC_URL+"/909_samples/bd01.wav").toDestination(),
    snare: new Tone.Player(process.env.PUBLIC_URL+"/909_samples/sd01.wav").toDestination(),
    cl_hihat: new Tone.Player(process.env.PUBLIC_URL+"/909_samples/hh01.wav").toDestination(),
    op_hihat: new Tone.Player(process.env.PUBLIC_URL+"/909_samples/oh01.wav").toDestination(),
    low_tom: new Tone.Player(process.env.PUBLIC_URL+"/909_samples/lt01.wav").toDestination(),
    mid_tom: new Tone.Player(process.env.PUBLIC_URL+"/909_samples/mt01.wav").toDestination(),
    hi_tom: new Tone.Player(process.env.PUBLIC_URL+"/909_samples/ht01.wav").toDestination(),
    crash: new Tone.Player(process.env.PUBLIC_URL+"/909_samples/cr01.wav").toDestination(),
    ride: new Tone.Player(process.env.PUBLIC_URL+"/909_samples/rd01.wav").toDestination(),
    rim: new Tone.Player(process.env.PUBLIC_URL+"/909_samples/rs01.wav").toDestination(),
    clap: new Tone.Player(process.env.PUBLIC_URL+"909_samples/cp01.wav").toDestination()
  }

const percussions: Object[] = [
      { 
        label: "Total accent", 
        value: "accent", 
        knobs: [{label: "Accent", value: "accent", key: "accent"}] 
      },
      { 
        label: "Bass drum", 
        value: "bass_drum", 
        knobs: [
        { 
          label: "Tune", 
          value: "bass_drum", 
          key: "bass_drum"
      }, 
        { 
          label: "Level", 
          key: "bass_drum"
      }, 
        { 
          label: "Attack", 
          value: "bass_drum", 
          key: "bass_drum"
      }, 
        { 
          label: "Decay", 
          value: "bass_drum", 
          key: "bass_drum"
      }] 
      },
      { 
        label: "Snare drum", 
        value: "snare", 
        knobs: [
          { 
            label: "Tune", 
            value: "snare", 
            key: "snare"
          }, 
          { 
            label: "Level", 
            key: "snare"
          }, 
          {
            label: "Tone", 
            value: "snare", 
            key: "snare"
          }, 
          {
            label: "Snappy", 
            value: "snare", 
            key: "snare"
          }
        ] 
      },
      { 
        label: "Low tom", 
        value:"low_tom", 
        knobs: [{ label: "Tune", value: "low_tom", key: "low_tom"}, { label: "Level", key: "low_tom"}, { label: "Decay", value: "low_tom", key: "low_tom"}] },
      { 
        label: "Mid tom", 
        value:"mid_tom", 
        knobs: [{ label: "Tune", value: "mid_tom", key: "mid_tom"}, { label: "Level", key: "mid_tom"}, { label: "Decay", value: "mid_tom", key: "mid_tom"}] },
      { 
        label: "Hi tom", 
        value:"hi_tom", 
        knobs: [{ label: "Tune", value: "hi_tom", key: "hi_tom"}, { label: "Level", key: "hi_tom"}, { label: "Decay", value: "hi_tom", key: "hi_tom"}] },
      { 
        label: "Rim", 
        value:"rim", 
        knobs: [{ label: "Level", key: "rim"}] },
      { 
        label: "Clap", 
        value:"clap", 
        knobs: [{ label: "Level", key: "clap"}] },
      {
        label: "Hi-hat",
        value: ["cl_hihat", "op_hihat"],
        knobs: [{ label: "Level", key: "cl_hihat"}, { label: "Level", key: "op_hihat"}, { label: "CH decay", value: "cl_hihat", key: "cl_hihat"}, { label: "OH decay", value: "op_hihat", key: "op_hihat"}],
        percussion: 2,
        button_labels: ["Closed Hi-hat", "Open Hi-hat"],
      },
      {
        label: "Cymbal",
        value: ["crash", "ride"],
        knobs: [{ label: "Level", key: "crash"}, { label: "Level", key: "ride"}, { label: "Crash tune", value: "crash", key: "crash"}, { label: "Ride tune", value: "ride", key: "ride"}],
        percussion: 2,
        button_labels: ["Crash", "Ride"],
      },
    ];