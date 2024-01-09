import React from "react";
import   DatePicker    from './components/DatePicker/'
import Task from "./components/Task/";
import SignUp from "./components/SignUp/";
function App() {
  const [globalDate,setGlobalDate] = React.useState(new Date())
  
  return (
    <div>
      <SignUp/>
      {/* <Task/> */}
      <DatePicker globalDate={globalDate} setGlobalDate={setGlobalDate} />
    </div>
  )
}

export default App
