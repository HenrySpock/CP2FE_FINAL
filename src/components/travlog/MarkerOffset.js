// src/hooks/useOffsetLogic.js
import { useState, useEffect } from 'react';

const offsetAmount = 0.0006;

function areClose(entry1, entry2) {
  return Math.abs(entry1.latitude - entry2.latitude) < offsetAmount && Math.abs(entry1.longitude - entry2.longitude) < offsetAmount;
}

function applyOffset(coord) {
  return coord + (Math.random() - 0.7) * offsetAmount;
}

export default function useOffsetLogic(initialData) {
  const [offsetData, setOffsetData] = useState([]);

  useEffect(() => {
    if (initialData.length > 0) {
      const offsetEntries = initialData.map((entry, index) => {
        let newEntry = { ...entry };
        for (let i = 0; i < index; i++) {
          if (areClose(newEntry, initialData[i])) {
            newEntry.latitude = applyOffset(newEntry.latitude);
            newEntry.longitude = applyOffset(newEntry.longitude);
          }
        }
        return newEntry;
      });
      setOffsetData(offsetEntries);
    }
  }, [initialData]);

  return offsetData;
}
