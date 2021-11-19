/* For picking the duration by showing a dropdown
 * duration state is passed as prop
 */

import React, { useState, useRef } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

export default function DurationPicker({ setDuration }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [items, setItems] = useState([
    { label: "1 hours", value: '1' },
    { label: "2 hours", value: '2' },
    { label: "3 hours", value: '3' },
    { label: "4 hours", value: '4' },
    { label: "5 hours", value: '5' },
    { label: "6 hours", value: '6' },
    { label: "7 hours", value: '7' },
    { label: "8 hours", value: '8' },
    { label: "1 day", value: '24' },
    { label: "2 days", value: '48' },
    { label: "3 days", value: '72' },
    { label: "4 days", value: '96' },
    { label: "5 days", value: '120' },
    { label: "6 days", value: '144' },
    { label: "7 days", value: '168' },
    { label: "8 days", value: '192' },
    { label: "9 days", value: '216' },
    { label: "10 days", value: '240' },
    { label: "11 days", value: '264' },
    { label: "12 days", value: '288' },
    { label: "13 days", value: '312' },
    { label: "14 days", value: '336' },
    { label: "15 days", value: '360' },
    { label: "16 days", value: '384' },
    { label: "17 days", value: '408' },
    { label: "18 days", value: '432' },
    { label: "19 days", value: '456' },
    { label: "20 days", value: '480' },
    { label: "21 days", value: '504' },
    { label: "22 days", value: '528' },
    { label: "23 days", value: '552' },
    { label: "24 days", value: '576' },
    { label: "25 days", value: '600' },
    { label: "26 days", value: '624' },
    { label: "27 days", value: '648' },
    { label: "28 days", value: '672' },
    { label: "29 days", value: '696' },
    { label: "30 days", value: '720' },
  ])

  return (
    <DropDownPicker
      placeholder="List for"
      open={open}
      value={selected}
      items={items}
      setOpen={setOpen}
      setValue={setSelected}
      onChangeValue={(value) => {
        setDuration(value)
      }}
      setItems={setItems}
      listMode="MODAL"
      scrollViewProps={{
        decelerationRate: "fast"
      }}
      modalProps={{
        animationType: "fade"
      }}
      flatListProps={{
        initialNumToRender: 10
      }}
      modalTitle="Select Duration"
      style={styles.dropdown}
    />
  )
}

const styles = StyleSheet.create({
  dropdown: {
    width: Dimensions.get('window').width - 20,
    alignSelf: 'center',
  }
})