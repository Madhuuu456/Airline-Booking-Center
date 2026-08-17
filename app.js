const flights=[
{id:"SR204",airline:"SkyRoute",from:"HYD",to:"DEL",depart:"06:15",arrive:"08:30",duration:"2h 15m",price:5249,seats:18},
{id:"SR118",airline:"SkyRoute",from:"HYD",to:"BOM",depart:"09:40",arrive:"11:15",duration:"1h 35m",price:3499,seats:9},
{id:"SR331",airline:"SkyRoute",from:"HYD",to:"GOI",depart:"12:25",arrive:"13:45",duration:"1h 20m",price:2799,seats:24},
{id:"SR208",airline:"SkyRoute",from:"HYD",to:"DEL",depart:"15:10",arrive:"17:25",duration:"2h 15m",price:4899,seats:6},
{id:"SR219",airline:"SkyRoute",from:"HYD",to:"DEL",depart:"18:35",arrive:"20:50",duration:"2h 15m",price:6199,seats:31},
{id:"SR224",airline:"SkyRoute",from:"HYD",to:"BLR",depart:"21:20",arrive:"22:40",duration:"1h 20m",price:3199,seats:14}
];

function today(){let d=new Date();return d.toISOString().slice(0,10)}
document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll('input[type="date"]').forEach(x=>{if(!x.value)x.value=today()})});

function searchFlights(){
 localStorage.setItem("routeFrom",document.getElementById("from").value);
 localStorage.setItem("routeTo",document.getElementById("to").value);
 location.href="flights.html";
}
function filterFlights(){renderFlights()}
function renderFlights(){
 const box=document.getElementById("flightList"); if(!box)return;
 let list=[...flights], sort=document.getElementById("sort")?.value||"price";
 if(sort==="price")list.sort((a,b)=>a.price-b.price);
 if(sort==="time")list.sort((a,b)=>a.depart.localeCompare(b.depart));
 if(sort==="duration")list.sort((a,b)=>a.duration.localeCompare(b.duration));
 document.getElementById("resultCount").textContent=list.length+" flights found";
 box.innerHTML=list.map(f=>`<article class="flight-card">
   <div class="airline"><div class="airline-logo">✈</div><div><b>${f.airline}</b><div class="duration">${f.id} • Economy</div></div></div>
   <div><div style="display:flex;justify-content:space-between"><span class="flight-time">${f.depart}<small> ${f.from}</small></span><span class="flight-time">${f.arrive}<small> ${f.to}</small></span></div><div class="route-line"></div><div class="duration" style="text-align:center">${f.duration} • Non-stop</div></div>
   <div><div class="price">₹${f.price.toLocaleString("en-IN")}<small>per passenger • taxes included</small></div><div class="duration">${f.seats} seats left</div></div>
   <button class="btn btn-primary" onclick="selectFlight('${f.id}')">Select</button>
 </article>`).join("");
}
function selectFlight(id){
 const f=flights.find(x=>x.id===id);
 localStorage.setItem("selectedFlight",JSON.stringify(f));
 location.href="booking.html";
}
function loadSelectedFlight(){
 const el=document.getElementById("selectedFlight"); if(!el)return;
 const f=JSON.parse(localStorage.getItem("selectedFlight")||"null");
 if(!f){el.innerHTML='<div class="notice">No flight selected. <a class="text-link" href="flights.html">Search flights</a></div>';return}
 el.innerHTML=`<div class="selected-box"><div class="airline"><div class="airline-logo">✈</div><div><b>${f.airline} ${f.id}</b><div class="duration">${f.from} → ${f.to} • ${f.duration}</div></div><div style="margin-left:auto;text-align:right"><b>₹${f.price.toLocaleString("en-IN")}</b><div class="duration">${f.depart} – ${f.arrive}</div></div></div></div>`;
}
function saveBooking(e){
 e.preventDefault();
 const f=JSON.parse(localStorage.getItem("selectedFlight")||"null");
 if(!f){location.href="flights.html";return}
 const pnr="SR"+Math.random().toString(36).substring(2,7).toUpperCase();
 const booking={pnr,flight:f,name:document.getElementById("first").value+" "+document.getElementById("last").value,email:document.getElementById("email").value};
 localStorage.setItem("booking",JSON.stringify(booking));
 location.href="confirmation.html";
}
function loadConfirmation(){
 const el=document.getElementById("confirmationDetails"); if(!el)return;
 const b=JSON.parse(localStorage.getItem("booking")||"null");
 if(!b){el.innerHTML="<p>No booking found.</p>";return}
 const f=b.flight;
 el.innerHTML=`<div style="display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap"><div><small>PASSENGER</small><h3>${b.name}</h3><small>PNR</small><h3>${b.pnr}</h3></div><div><small>FLIGHT</small><h3>${f.airline} ${f.id}</h3><small>ROUTE</small><h3>${f.from} → ${f.to}</h3></div><div><small>TIME</small><h3>${f.depart} – ${f.arrive}</h3><small>FARE</small><h3>₹${f.price.toLocaleString("en-IN")}</h3></div></div>`;
}