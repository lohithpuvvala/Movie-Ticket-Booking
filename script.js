const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const movieContainer = document.querySelector('.movie-container');

let ticketPrice = parseInt(movieSelect.value);

populateUI();

//save selected movie index and price
function setMovieData(index,price)
{
    localStorage.setItem('selectedMovieIndex',index);
    localStorage.setItem('selectedMoviePrice',price);
}

function updateSelectedCount()
{
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount*ticketPrice;
}

//Get Data from local storage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0)
    {
        seats.forEach((seat,index) => {
             if(selectedSeats.indexOf(index) > -1)
             {
                seat.classList.add('selected');
             }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null) movieSelect.selectedIndex = selectedMovieIndex;
}

movieSelect.addEventListener('change',e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount;
});

movieContainer.addEventListener('change',function(e){
    ticketPrice = parseInt(movieSelect.value);
    movieContainer.querySelector('small').innerText = `${ticketPrice} ₹`;
});


container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied'))
    {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});


//Initial count and total set
updateSelectedCount();