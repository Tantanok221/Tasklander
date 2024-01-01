let easeIn = [.17,.67,.83,.67]


export const animateContainer = {
  ease: easeIn,
  hidden: {opacity: 0},
  show: {opacity: 1, transition: {
    staggerChildren: 0.12
  }},
  exit: {opacity: 0}
}

export const animateItem = {
  ease: easeIn,
  hidden: {opacity: 0},
  show: {opacity: 1, transition: {
    staggerChildren: 0.06
  }}
}