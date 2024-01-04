import React from 'react'
import style from "./style.module.css"
import classNames from 'classnames/bind'
import {motion} from "framer-motion"
import {supabase} from "../../helper/supabase.js"


async function signInWithEmail(email,password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })
}


const Login = () => {
  const sx = classNames.bind(style)
  return (
    <div>Task</div>
  )
}

export default Login