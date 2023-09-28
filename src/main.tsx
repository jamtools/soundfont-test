import {InstrumentName} from 'soundfont-player';

import './App.css';
import {SoundfontInstrumentNames, playChord, playNote, playNotes} from './soundfont-instruments';
import {useState} from 'react';

enum PlayInstruction {
    PLAY_NOTE = 'play_note',
    PLAY_NOTES = 'play_notes',
    PLAY_CHORD = 'play_chord',
}

const actions = {
    [PlayInstruction.PLAY_NOTE]: (name: InstrumentName) => playNote(name, 'C4'),
    [PlayInstruction.PLAY_NOTES]: (name: InstrumentName) => playNotes(name, ['C4', 'D4', 'E4', 'G4', 'C5']),
    [PlayInstruction.PLAY_CHORD]: (name: InstrumentName) => playChord(name, ['C4', 'E4', 'G4', 'C5']),
} as const;

export default function Main() {
    const [playInstruction, setPlayInstruction] = useState<PlayInstruction>(PlayInstruction.PLAY_NOTE)

    const handleClick = (name: InstrumentName) => {
        actions[playInstruction]?.(name);
    }

    const buttons = SoundfontInstrumentNames.map(name => (
        <button
            style={{margin: '5px'}}
            onClick={() => handleClick(name)}
        >
            {name}
        </button>
    ))

    return (
        <div className='App'>
            <header className='App-header'>
                <fieldset>
                    <ul style={{listStyle: 'none'}}>
                        <li>
                            <label>Play note</label>
                            <input
                                checked={playInstruction === PlayInstruction.PLAY_NOTE}
                                type='radio'
                                onClick={() => setPlayInstruction(PlayInstruction.PLAY_NOTE)}
                            />
                        </li>
                        <li>
                            <label>Play lead</label>
                            <input
                                checked={playInstruction === PlayInstruction.PLAY_NOTES}
                                type='radio'
                                onClick={() => setPlayInstruction(PlayInstruction.PLAY_NOTES)}
                            />
                        </li>
                        <li>
                            <label>Play chord</label>
                            <input
                                checked={playInstruction === PlayInstruction.PLAY_CHORD}
                                type='radio'
                                onClick={() => setPlayInstruction(PlayInstruction.PLAY_CHORD)}
                            />
                        </li>
                    </ul>
                </fieldset>
                <div>
                    {buttons}
                </div>
            </header>

        </div>
    )
}
