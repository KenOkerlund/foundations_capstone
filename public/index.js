const gallery = document.getElementById("gallery");
const addBtn = document.getElementById("toggle");
const slider = document.getElementById("slide");
const submitBtn = document.getElementById("submit-btn");
const allBtn = document.getElementById("all");
const puttersBtn = document.getElementById("putters");
const midrangeBtn = document.getElementById("midrange");
const fairwayBtn = document.getElementById("fairway");
const distanceBtn = document.getElementById("distance");

const getDiscs = () => {
  return axios.get("http://localhost:4050/discs/");
};

const deleteDisc = (id) => {
  return axios.delete(`http://localhost:4050/discs/${id}`)
}

const addDisc = () => {
  const newImage = document.getElementById('new-image').value;
  const newManufacturer = document.getElementById('new-manufacturer').value;
  const newName = document.getElementById('new-name').value;
  const newType = document.getElementById('new-type').value;
  const newColor = document.getElementById('new-color').value;
  const newSpeed = document.getElementById('new-speed').value;
  const newGlide = document.getElementById('new-glide').value;
  const newTurn = document.getElementById('new-turn').value;
  const newFade = document.getElementById('new-fade').value;
  axios.post('http://localhost:4050/discs/', {
    newImage,
    newManufacturer,
    newName,
    newType,
    newColor,
    newSpeed,
    newGlide,
    newTurn,
    newFade,
  })
  .then(() => getAndRenderDiscs());
}

const sortDiscs = (type) => {
  axios.get(`http://localhost:4050/sort/${type}`, {
  })
  .then((res) => {
    gallery.innerHTML = '';
    res.data.forEach((disc) => {
      renderDiscs(disc)
    });
  })
}

const renderDiscs = (disc) => {
  
  const div = document.createElement('div');
  div.classList.add('gallery-card');

  const rating = document.createElement('div');
  rating.classList.add('gallery-rating')

  const speedRating = document.createElement('div');

  const glideRating = document.createElement('div');

  const turnRating = document.createElement('div');

  const fadeRating = document.createElement('div');
  
  const image = document.createElement('img');
  image.src = disc.image_url;
  image.classList.add('gallery-image');

  const type = document.createElement('p');
  type.innerHTML = disc.type;
  type.classList.add('gallery-type')

  const title = document.createElement('h3');
  title.innerHTML = `${disc.manufacturer} ${disc.name}`
  title.classList.add('gallery-title');

  const speedString = document.createElement('p');
  speedString.innerHTML = 'Speed';
  speedString.classList.add('speed-rating');

  const glideString = document.createElement('p');
  glideString.innerHTML = 'Glide';
  glideString.classList.add('glide-rating');

  const turnString = document.createElement('p');
  turnString.innerHTML = 'Turn';
  turnString.classList.add('turn-rating');

  const fadeString = document.createElement('p');
  fadeString.innerHTML = 'Fade';
  fadeString.classList.add('fade-rating');

  const speed = document.createElement('p');
  speed.innerHTML = disc.speed;
  speed.classList.add('speed-rating');

  const glide = document.createElement('p');
  glide.innerHTML = disc.glide;
  glide.classList.add('glide-rating');
  
  const turn = document.createElement('p');
  turn.innerHTML = disc.turn;
  turn.classList.add('turn-rating');

  const fade = document.createElement('p');
  fade.innerHTML = disc.fade;
  fade.classList.add('fade-rating');

  const deleteX = document.createElement('button');
  deleteX.innerHTML = 'X';
  deleteX.classList.add('delete-btn');

  deleteX.addEventListener('click', () => {
    deleteX.setAttribute('disabled', 'true');
    deleteDisc(disc.disc_id)
    .then(() => {
      div.remove();
      console.log('success!');
    })
    .catch(() => {
      console.log('FAILURE');
      deleteX.removeAttribute('disabled');
      alert('Unable to delete the disc. Try again?');
    });
  });

  div.appendChild(deleteX);
  div.appendChild(image);
  div.appendChild(type);
  div.appendChild(title);

  speedRating.appendChild(speedString);
  speedRating.appendChild(speed);
  rating.appendChild(speedRating);
  
  glideRating.appendChild(glideString);
  glideRating.appendChild(glide);
  rating.appendChild(glideRating);

  turnRating.appendChild(turnString);
  turnRating.appendChild(turn);
  rating.appendChild(turnRating);

  fadeRating.appendChild(fadeString);
  fadeRating.appendChild(fade);
  rating.appendChild(fadeRating);

  div.appendChild(rating);

  gallery.appendChild(div);
}

const getAndRenderDiscs = () => {
  gallery.innerHTML = '';
  getDiscs().then((res) => {
    res.data.forEach((disc) => {
      renderDiscs(disc)
    });
  });
};

getAndRenderDiscs();

addBtn.addEventListener('click', () => {
  slider.classList.toggle('active');
  addBtn.classList.toggle('active');
})

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addDisc();
  const form = document.getElementById('the-form');
  form.reset();
});

allBtn.addEventListener('click', () => getAndRenderDiscs());
puttersBtn.addEventListener('click', () => sortDiscs('Putter'));
midrangeBtn.addEventListener('click', () => sortDiscs('Midrange'));
fairwayBtn.addEventListener('click', () => sortDiscs('Fairway Driver'));
distanceBtn.addEventListener('click', () => sortDiscs('Distance Driver'));