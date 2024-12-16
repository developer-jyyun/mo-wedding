export const handleCall = (phoneNumber: number) => {
  console.log(phoneNumber)
  window.location.href = `tel:${phoneNumber}`
}

export const handleMessage = (phoneNumber: number) => {
  console.log(phoneNumber)
  window.location.href = `sms:${phoneNumber}`
}
