const fs = require('fs')
const express = require("express")
const {google} = require("googleapis")
const app = express()
app.get('/', async (req,res)=>{
        const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes:"https://www.googleapis.com/auth/spreadsheets"
    })
    const client = await auth.getClient()
    const googleSheets = google.sheets({
        version: "v4",
        auth: client
    })
    const spreadsheetId = "1C3wIWlvmiAYvqSyZjYDtbdFVcUuGFM6u7Se9qonUtmM"

  const getrows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "responses!B:D"
  })
  //console.log(getrows.data.values);
  const keysArray = getrows.data.values[0]
const responseJSON = getrows.data.values.map((item, index) => {
    return { [index]: item };
});
  console.log(responseJSON )
  fs.writeFile('data.json', JSON.stringify(responseJSON), (err) => {
    if (err) {
      console.error(err);
      return;
    }})
res.status(200).send("data :"+'\n'+getrows.data.values)
})

app.listen(80,()=>{console.log("running on http://127.0.0.1/")})
