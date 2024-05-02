class Instrument {
    constructor(weight, volume, baseValue) {
        this.weight = weight;
        this.volume = volume;
        this.baseValue = baseValue;
    }
}
function selectHelper(instruments, index, payloadRemaining, volumeRemaining, selected) {
    if (index === instruments.length || payloadRemaining <= 0 || volumeRemaining <= 0) {
        return selected;
    }
    const currentInstrument = instruments[index];
    const newPayloadRemaining = payloadRemaining - currentInstrument.weight;
    const newVolumeRemaining = volumeRemaining - currentInstrument.volume;
    if (newPayloadRemaining >= 0 && newVolumeRemaining >= 0) {
        const selectedWithCurrent = [...selected, currentInstrument];
        const resultWithCurrent = selectHelper(instruments, index + 1, newPayloadRemaining, newVolumeRemaining, selectedWithCurrent);
        const resultWithoutCurrent = selectHelper(instruments, index + 1, payloadRemaining, volumeRemaining, selected);
        return calculateTotalValue(resultWithCurrent) > calculateTotalValue(resultWithoutCurrent) ? resultWithCurrent : resultWithoutCurrent;
    } else {
        return selectHelper(instruments, index + 1, payloadRemaining, volumeRemaining, selected);
    }
}
function calculateTotalValue(instruments) {
    return instruments.reduce((totalValue, instrument) => totalValue + instrument.baseValue, 0);
}

function selectInstruments(instruments, payloadCapacity, volumeCapacity) {
    const selectedInstruments = selectHelper(instruments, 0, payloadCapacity, volumeCapacity, []);
    const totalWeight = selectedInstruments.reduce((total, instrument) => total + instrument.weight, 0);
    const totalVolume = selectedInstruments.reduce((total, instrument) => total + instrument.volume, 0);
    const totalValue = calculateTotalValue(selectedInstruments);

    return {
        selectedInstruments: selectedInstruments,
        totalWeight: totalWeight,
        totalVolume: totalVolume,
        totalValue: totalValue
    };
}
const instruments = [
    new Instrument(3, 2, 10),
    new Instrument(4, 3, 15),
    new Instrument(2, 1, 8),
    new Instrument(5, 4, 20)
];
const payloadCapacity = 10;
const volumeCapacity = 7;
const result = selectInstruments(instruments, payloadCapacity, volumeCapacity);
console.log("Selected Instruments:", result.selectedInstruments);
console.log("Total Weight:", result.totalWeight, "kg");
console.log("Total Volume:", result.totalVolume, "m^3");
console.log("Total Scientific Value:", result.totalValue);
