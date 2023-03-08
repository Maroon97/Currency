document.getElementById('Loading').style.visibility = 'hidden'
function getCountries() {
   const url = 'https://restcountries.com/v3.1/all'
   var select = document.getElementById('s_countries');
   var btn_childs = document.getElementById('btn_currency')
   btn_childs.style.visibility = 'hidden'
   fetch(url)
      .then((response) => response.json())
      .then((res) => {

         for (let country in res) {

            var country_name = res[country].name.common
            var option = document.createElement('option')
            option.value = country
            option.innerHTML = country_name
            select.appendChild(option)


            select.onchange = (e) => {
               document.getElementById('conversion').innerHTML = ''
               if (!e.target.value) {
                  btn_childs.style.visibility = 'hidden'
               } else {
                  var curres = res[e.target.value].currencies
                  btn_childs.style.visibility = 'visible'
                  btn_childs.innerHTML = ''


                  for (let curr in curres) {
                     console.log(curres)
                     var btn_res = document.createElement('button')
                     btn_res.value = curr
                     btn_res.innerHTML = curres[curr].name + ' (' +curr+ ')'
                     btn_res.style.margin = '5px'
                    
                     btn_res.style.padding = '10px'
                     btn_res.style.backgroundColor = 'lightgrey'
                     btn_childs.appendChild(btn_res)


                     btn_res.onclick = (e) => {
                        document.getElementById('Loading').style.visibility = 'visible'
                        var URL2 = 'https://api.fastforex.io/fetch-multi?from=' + e.target.value + '&to=USD&api_key=5baf52db43-236a5a306f-rqjl8g'
                        fetch(URL2).then((response) => response.json()).then((conv) => {
                           document.getElementById('Loading').style.visibility = 'hidden'

                           var currconv = document.createElement('h3')
                           currconv.style.fontSize = '15px'

                           currconv.innerHTML = '1' + ' ' + e.target.value + ' ' + '=' + ' ' + conv.results.USD + ' ' + 'USD'
                           document.getElementById('conversion').appendChild(currconv)


                        })
                     }

                  }



               }



            }

         }
      })


}

getCountries()