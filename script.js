const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const movieContainer = document.querySelector('.movie-container');

let ticketPrice = parseInt(movieSelect.value);

function updateSelectedCount()
{
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount*ticketPrice;
}

movieSelect.addEventListener('change',e => {
    ticketPrice = +e.target.value;
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