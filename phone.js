//Load data using phone hunter API

const getallphone = async (searchText, database) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  const res = await fetch(url)
  const data = await res.json()
  displayphone(data.data, database);
}
//Dispplay phones 
const displayphone = (phones, database) => {
  const olddiv = document.getElementById('allphone')

  olddiv.innerText = ``;
  //SHOW ALL BUTTON DISPLAY LENGTH
  const showall = document.getElementById('seemore');

  if (database && phones.length > 6) {

    phones = phones.slice(0, 6);

    showall.classList.remove('d-none');
  }
  else {
    showall.classList.add('d-none');
  }


  //No found code

  const notfoundfield = document.getElementById('notfound')
  if (phones.length === 0) {
    notfoundfield.classList.remove('d-none')
  }
  else {
    notfoundfield.classList.add('d-none');
  }

  runspin(false);


  //NEW DIV DISPLAY


  phones.forEach(phone => {

    const nwdiv = document.createElement('div')
    nwdiv.classList.add('col')
    nwdiv.innerHTML = `
        <div   class="card h-100 phone border border-warning p-5">
        <img src="${phone.image}" class="card-img-top p-5" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">A mobile phone, cellular phone, cell phone, cellphone, handphone, hand phone or pocket phone, sometimes shortened to simply mobile, cell, or just phone, is a portable telephone that can make and receive calls over a radio frequency link while the user is moving within a telephone service area.</p>
          <button onclick="getdetails('${phone.slug}')" class="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#phoneModal"><b> BUY NOW</b></button>
        </div>
      </div>
        
        
        
        
        `

    olddiv.appendChild(nwdiv);
    //spin stop
    runspin(false);

  });
}
//input result
const pushdata = (database) => {
  runspin(true);
  const inputfield = document.getElementById('input-field')
  const searchText = inputfield.value;
  getallphone(searchText, database);

}
document.getElementById('input-field').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    pushdata(10);
  }
})

//search funationally
const getsearch = () => {
  //spiner start
  pushdata(10);
}
//toggle spiner
const runspin = isLoading => {
  const loader = document.getElementById
    ('spiner')

  //show and hide condition
  if (isLoading) {
    loader.classList.remove('d-none')
  }
  else {
    loader.classList.add('d-none')
  }
}
//keybord enter button
document.getElementById('showmorebtn').addEventListener('click', function () {
  pushdata();

})
//show modal
const getdetails = async id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  const res = await fetch(url);
  const data = await res.json();
  displaydetails(data.data);

}

const displaydetails = phone => {
  console.log(phone);
  const phntitle = document.getElementById('phoneModalLabel');
  phntitle.innerText = phone.name;
  const phnsp = document.getElementById('phnspeci')
  phnsp.innerHTML = `
  <p>Update:${phone.releaseDate ? phone.releaseDate : 'NO DATE'
    }</p>
  <p>DisplaySize:${phone.mainFeatures.displaySize}</p>
  <p>ChipSet:${phone.mainFeatures.chipSet}</p>
  <p>Memory:${phone.mainFeatures.memory}</p>



`

}




getallphone('');