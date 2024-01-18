
// MarkerOffset.js
const offsetAmount = 0.0006;

function areClose(entry1, entry2) {
  return Math.abs(entry1.latitude - entry2.latitude) < offsetAmount && Math.abs(entry1.longitude - entry2.longitude) < offsetAmount;
}

function applyOffset(coord) {
  return coord + (Math.random() - 0.5) * offsetAmount;
}

export function applyMarkerOffset(entries) {
  return entries.map((entry, index, arr) => {
    let newEntry = { ...entry };
    for (let i = 0; i < index; i++) {
      if (areClose(newEntry, arr[i])) {
        newEntry.latitude = applyOffset(newEntry.latitude);
        newEntry.longitude = applyOffset(newEntry.longitude);
      }
    }
    return newEntry;
  });
}






 