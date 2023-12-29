import React from "react";
import   DatePicker    from './components/DatePicker/DatePicker'
function App() {
  const [globalDate,setGlobalDate] = React.useState("")
  console.log(globalDate)
  return (
    <div>
      <DatePicker globalDate={globalDate} setGlobalDate={setGlobalDate} />
    </div>
  )
}

export default App
