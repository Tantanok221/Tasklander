import React from 'react'
import style from "./style.module.css"
import classNames from 'classnames/bind'
import {motion} from "framer-motion"
import {supabase} from "../..helper/supabase.js"

async function signUpNewUser(email,password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: 'https//example.com/welcome'
    }
  })
}

const SignUp = () => {
  const sx = classNames.bind(style)
  return (
    <div>SignUp</div>
  )
}
export default SignUp